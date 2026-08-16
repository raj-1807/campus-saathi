"""Small local retrieval helper for testing before Supabase is connected."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


def _tokens(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def _score(query: str, text: str) -> float:
    query_tokens = _tokens(query)
    if not query_tokens:
        return 0.0
    hits = len(query_tokens & _tokens(text))
    return min(0.98, hits / len(query_tokens) + (0.35 if hits else 0))


def search_chunks(
    query: str,
    chunks_path: str | Path = "data/processed/chunks.json",
    category: str = "all",
    limit: int = 5,
) -> list[dict[str, Any]]:
    path = Path(chunks_path)
    if not path.exists():
        return []

    chunks = json.loads(path.read_text(encoding="utf-8"))
    results = []
    for chunk in chunks:
        if category != "all" and chunk.get("category") != category:
            continue
        relevance = _score(query, f"{chunk.get('title', '')} {chunk.get('content', '')}")
        if relevance > 0.25:
            results.append({**chunk, "relevance": relevance})

    return sorted(results, key=lambda row: row["relevance"], reverse=True)[:limit]
