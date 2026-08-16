"""Build a chunked campus knowledge dataset from files in data/raw.

Usage:
  python src/ingestion/chunk_documents.py
  python src/ingestion/chunk_documents.py --raw-dir data/raw --out data/processed/chunks.json
"""

from __future__ import annotations

import argparse
import csv
import json
import re
from dataclasses import asdict, dataclass
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception:  # pragma: no cover - optional until PDFs are used
    PdfReader = None


@dataclass
class Chunk:
    id: str
    title: str
    content: str
    category: str
    source: str
    chunk_index: int


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def guess_category(path: Path) -> str:
    name = path.stem.lower()
    category_map = {
        "admission": "admissions",
        "placement": "placements",
        "library": "facilities",
        "service": "facilities",
        "event": "events",
        "course": "courses",
        "faculty": "faculty",
    }
    for key, category in category_map.items():
        if key in name:
            return category
    return "general"


def read_pdf(path: Path) -> str:
    if PdfReader is None:
        raise RuntimeError("pypdf is not installed. Run pip install -r requirements.txt")
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def read_csv(path: Path) -> str:
    rows = []
    with path.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            rows.append("; ".join(f"{key}: {value}" for key, value in row.items() if value))
    return "\n".join(rows)


def read_file(path: Path) -> str:
    if path.suffix.lower() == ".pdf":
        return read_pdf(path)
    if path.suffix.lower() == ".csv":
        return read_csv(path)
    return path.read_text(encoding="utf-8", errors="ignore")


def split_words(text: str, chunk_words: int, overlap_words: int) -> list[str]:
    words = clean_text(text).split()
    if not words:
        return []

    chunks = []
    step = max(1, chunk_words - overlap_words)
    for start in range(0, len(words), step):
        part = words[start : start + chunk_words]
        if len(part) < 25 and chunks:
            chunks[-1] = f"{chunks[-1]} {' '.join(part)}"
        else:
            chunks.append(" ".join(part))
    return chunks


def build_chunks(raw_dir: Path, chunk_words: int, overlap_words: int) -> list[Chunk]:
    supported = {".txt", ".md", ".csv", ".pdf"}
    chunks: list[Chunk] = []

    for path in sorted(raw_dir.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in supported:
            continue

        text = read_file(path)
        title = path.stem.replace("_", " ").replace("-", " ").title()
        category = guess_category(path)

        for index, content in enumerate(split_words(text, chunk_words, overlap_words)):
            chunks.append(
                Chunk(
                    id=f"{path.stem}-{index}",
                    title=title,
                    content=content,
                    category=category,
                    source=path.name,
                    chunk_index=index,
                )
            )

    return chunks


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw-dir", default="data/raw")
    parser.add_argument("--out", default="data/processed/chunks.json")
    parser.add_argument("--chunk-words", type=int, default=140)
    parser.add_argument("--overlap-words", type=int, default=30)
    args = parser.parse_args()

    chunks = build_chunks(Path(args.raw_dir), args.chunk_words, args.overlap_words)
    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps([asdict(chunk) for chunk in chunks], indent=2), encoding="utf-8")

    print(f"Wrote {len(chunks)} chunks to {out_path}")


if __name__ == "__main__":
    main()
