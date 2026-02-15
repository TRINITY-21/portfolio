---
title: "Building RAG Applications: From Naive Search to Production Pipeline"
slug: "building-rag-applications"
date: "2026-02-08"
description: "A practical guide to building Retrieval-Augmented Generation systems that actually work. Covers embedding strategies, chunking, vector databases, re-ranking, and the pitfalls that tutorials skip."
tags: ["AI", "RAG", "LLMs", "Python", "Vector Databases"]
published: true
---

Every company with documents wants a "chat with your data" product. Most of them build a naive RAG pipeline, throw it into production, and wonder why users hate it. The gap between a RAG demo and a RAG product is enormous — and it's mostly about the retrieval, not the generation.

Here's what I've learned building RAG systems that people actually use.

## The Naive Pipeline (And Why It Fails)

Every tutorial teaches this:

```python
# Step 1: Load documents
documents = load_pdfs("./docs/")

# Step 2: Split into chunks
chunks = text_splitter.split(documents, chunk_size=500)

# Step 3: Embed and store
vectorstore.add(chunks)

# Step 4: Query
results = vectorstore.similarity_search(query, k=5)
answer = llm.generate(query, context=results)
```

This works for demos. It fails in production because:

1. **Chunking destroys context.** A sentence split mid-paragraph loses meaning.
2. **Naive similarity search returns noise.** Semantic similarity ≠ relevance.
3. **No concept of recency, authority, or source quality.** A draft document matches as well as an approved one.
4. **The LLM hallucinates when context is poor.** Bad retrieval → confident wrong answers.

Let's fix each of these.

## Chunking Strategies That Preserve Meaning

Chunking is the most underrated component of RAG. Your chunk strategy determines your retrieval ceiling — no amount of re-ranking fixes bad chunks.

### Semantic Chunking

Instead of splitting every N characters, split on meaning boundaries:

```python
from dataclasses import dataclass

@dataclass
class SemanticChunk:
    content: str
    metadata: dict
    heading_context: str  # Parent headings for context

def semantic_chunk(document: str, max_tokens: int = 512) -> list[SemanticChunk]:
    """Split on natural boundaries: headings, paragraphs, code blocks."""
    sections = split_by_headings(document)
    chunks = []

    for section in sections:
        heading = section.heading
        paragraphs = section.content.split("\n\n")

        current_chunk = []
        current_size = 0

        for para in paragraphs:
            para_tokens = count_tokens(para)

            if current_size + para_tokens > max_tokens and current_chunk:
                chunks.append(SemanticChunk(
                    content="\n\n".join(current_chunk),
                    metadata=section.metadata,
                    heading_context=heading,
                ))
                current_chunk = []
                current_size = 0

            current_chunk.append(para)
            current_size += para_tokens

        if current_chunk:
            chunks.append(SemanticChunk(
                content="\n\n".join(current_chunk),
                metadata=section.metadata,
                heading_context=heading,
            ))

    return chunks
```

### Overlapping Context Windows

Add overlap between chunks so information at boundaries isn't lost:

```python
def chunk_with_overlap(text: str, chunk_size: int = 500, overlap: int = 50):
    """Each chunk shares overlap tokens with its neighbors."""
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks
```

### Parent-Child Chunking

Store small chunks for precise retrieval, but retrieve the parent for richer context:

```python
def create_parent_child_chunks(document: str):
    # Parent: large chunks (2000 tokens) for context
    parents = chunk(document, size=2000)

    # Children: small chunks (200 tokens) for precise matching
    children = []
    for i, parent in enumerate(parents):
        for child in chunk(parent, size=200):
            children.append({
                "content": child,
                "parent_id": i,
                "parent_content": parent,
            })

    return parents, children

# At query time: match against children, return parents
def retrieve(query: str, children_index, parents):
    matched_children = children_index.search(query, k=10)
    parent_ids = set(c["parent_id"] for c in matched_children)
    return [parents[pid] for pid in parent_ids]
```

## Embedding: The Foundation of Retrieval

Your embedding model determines how well semantic search works. This choice matters more than your vector database.

```python
from sentence_transformers import SentenceTransformer
import numpy as np

# For most use cases, this is the sweet spot of quality vs. speed
model = SentenceTransformer("BAAI/bge-large-en-v1.5")

def embed_with_instruction(texts: list[str], is_query: bool = False):
    """BGE models perform better with task-specific prefixes."""
    if is_query:
        texts = [f"Represent this sentence for searching relevant passages: {t}"
                 for t in texts]
    return model.encode(texts, normalize_embeddings=True)
```

**Key decisions:**

| Factor | Recommendation |
|--------|---------------|
| General English text | `bge-large-en-v1.5` or `e5-large-v2` |
| Multilingual | `multilingual-e5-large` |
| Code + text | `voyage-code-2` |
| Speed over quality | `bge-small-en-v1.5` |
| Maximum quality | `voyage-3` or Cohere `embed-v3` |

## Hybrid Search: Don't Rely on Vectors Alone

Pure vector search misses exact matches. "Error code XJ-4021" won't match semantically. Combine vector search with keyword search:

```python
def hybrid_search(query: str, k: int = 10, alpha: float = 0.7):
    """
    Combine semantic and keyword search.
    alpha: weight for semantic (1.0 = pure semantic, 0.0 = pure keyword)
    """
    # Semantic search via embeddings
    semantic_results = vector_store.similarity_search(
        query_embedding=embed(query),
        k=k * 2,
    )

    # Keyword search via BM25
    keyword_results = bm25_index.search(query, k=k * 2)

    # Reciprocal Rank Fusion to combine
    combined = reciprocal_rank_fusion(
        [semantic_results, keyword_results],
        weights=[alpha, 1 - alpha],
    )

    return combined[:k]

def reciprocal_rank_fusion(result_lists, weights, k=60):
    """RRF merges ranked lists without needing score normalization."""
    scores = {}

    for results, weight in zip(result_lists, weights):
        for rank, doc in enumerate(results):
            doc_id = doc["id"]
            if doc_id not in scores:
                scores[doc_id] = 0
            scores[doc_id] += weight * (1 / (k + rank + 1))

    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_id for doc_id, score in ranked]
```

## Re-Ranking: The Quality Multiplier

Initial retrieval casts a wide net. Re-ranking focuses it. A cross-encoder re-ranker is the single biggest quality improvement you can add to a RAG pipeline:

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")

def retrieve_and_rerank(query: str, k_initial: int = 20, k_final: int = 5):
    # Stage 1: Fast retrieval (bi-encoder)
    candidates = hybrid_search(query, k=k_initial)

    # Stage 2: Precise re-ranking (cross-encoder)
    pairs = [(query, doc["content"]) for doc in candidates]
    scores = reranker.predict(pairs)

    # Sort by re-ranker score
    ranked = sorted(
        zip(candidates, scores),
        key=lambda x: x[1],
        reverse=True,
    )

    return [doc for doc, score in ranked[:k_final]]
```

This two-stage approach gives you the speed of bi-encoder retrieval with the accuracy of cross-encoder ranking.

## The Generation Layer

With good retrieval, generation is straightforward. The key is a well-structured prompt:

```python
def generate_answer(query: str, contexts: list[dict]) -> str:
    context_text = "\n\n---\n\n".join(
        f"[Source: {ctx['source']}, Page {ctx.get('page', 'N/A')}]\n{ctx['content']}"
        for ctx in contexts
    )

    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=2048,
        system="""You are a helpful assistant that answers questions based on
the provided context. Follow these rules strictly:
- Only answer based on the provided context
- If the context doesn't contain enough information, say so clearly
- Cite sources using [Source: filename] format
- Never make up information not present in the context""",
        messages=[{
            "role": "user",
            "content": f"Context:\n{context_text}\n\nQuestion: {query}"
        }]
    )

    return response.content[0].text
```

## Evaluation: Measuring RAG Quality

You can't improve what you can't measure. Build an evaluation set:

```python
eval_set = [
    {
        "question": "What is the refund policy for enterprise plans?",
        "expected_answer": "Enterprise plans have a 30-day refund window...",
        "expected_sources": ["pricing-policy.pdf"],
    },
    # ... 50-100 more examples
]

def evaluate_rag(pipeline, eval_set):
    metrics = {"retrieval_recall": [], "answer_relevance": [], "faithfulness": []}

    for example in eval_set:
        # Retrieval quality: did we find the right sources?
        retrieved = pipeline.retrieve(example["question"])
        sources = [r["source"] for r in retrieved]
        recall = len(set(sources) & set(example["expected_sources"])) / len(example["expected_sources"])
        metrics["retrieval_recall"].append(recall)

        # Answer quality: use LLM-as-judge
        answer = pipeline.generate(example["question"], retrieved)
        relevance = judge_relevance(answer, example["expected_answer"])
        faithfulness = judge_faithfulness(answer, retrieved)
        metrics["answer_relevance"].append(relevance)
        metrics["faithfulness"].append(faithfulness)

    return {k: sum(v) / len(v) for k, v in metrics.items()}
```

## Production Checklist

Before shipping a RAG system:

- **Chunking tested** with real documents (not just clean markdown)
- **Hybrid search** implemented (vector + keyword)
- **Re-ranking** in place for quality-critical queries
- **Citation/source tracking** from chunk to answer
- **Hallucination guardrails** — detect when the model goes off-context
- **Feedback loop** — users can flag bad answers
- **Monitoring** — track retrieval scores, latency, and answer quality
- **Index freshness** — pipeline to re-index when source documents change

RAG looks simple on the surface. The difference between a demo and a product is in every one of these details.
