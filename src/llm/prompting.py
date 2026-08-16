"""Prompt helpers for grounded Campus Saathi answers."""

from __future__ import annotations

from typing import Any


def build_grounded_prompt(question: str, sources: list[dict[str, Any]]) -> str:
    context = "\n\n".join(
        f"[{index + 1}] {source.get('title')} ({source.get('source')})\n{source.get('content')}"
        for index, source in enumerate(sources)
    )

    return f"""You are Campus Saathi, a helpful campus assistant.
Answer only from the context. If the answer is not in the context, say the information is not available in the campus knowledge base.
Use concise bullet points when useful and cite sources like [1].

Context:
{context or "No relevant context found."}

Student question:
{question}
"""
