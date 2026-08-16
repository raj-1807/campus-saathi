-- Campus Saathi RAG database schema for Supabase PostgreSQL + pgvector.
-- Run this in Supabase Dashboard -> SQL Editor.

create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  title text not null,
  content text not null,
  category text not null default 'general',
  source text not null default 'Campus Knowledge Base',
  chunk_index integer not null default 0,
  embedding vector(768) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists documents_category_idx on documents (category);
create index if not exists documents_source_idx on documents (source);
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float default 0.5,
  match_count int default 5,
  filter_category text default null
)
returns table (
  id bigint,
  title text,
  content text,
  category text,
  source text,
  chunk_index integer,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.title,
    documents.content,
    documents.category,
    documents.source,
    documents.chunk_index,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where
    (filter_category is null or filter_category = 'all' or documents.category = filter_category)
    and 1 - (documents.embedding <=> query_embedding) >= match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

alter table documents enable row level security;

drop policy if exists "Allow read access to documents" on documents;
create policy "Allow read access to documents"
  on documents for select
  using (true);
