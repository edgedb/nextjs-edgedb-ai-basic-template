# 🔍 Next.js + EdgeDB Semantic Search Template

This starter demonstrates how to implement semantic search using EdgeDB's vector types and Next.js. It provides a foundation for building applications with semantic search capabilities by leveraging EdgeDB's `ai` extension.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fedgedb%2Fnextjs-edgedb-ai-basic-template&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22edgedb%22%2C%22productSlug%22%3A%22edgedb%22%7D%5D)

## ✨ EdgeDB Schema

```sql
using extension ai;

module default {
  type Post {
    required title: str;
    required content: str;
    required author: str;

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    deferred index ext::ai::index(embedding_model := 'text-embedding-3-small')
      on (.content);
  }
}
```

- **AI extension**: Uses EdgeDB's `ai` extension which automatically handles vector embeddings
- **AI index**: The `ext::ai::index` automatically generates and stores embeddings for the content field using OpenAI's `text-embedding-3-small` model
- **Automatic Timestamps**: 
  - `created` field is automatically set on insert
  - `updated` field is automatically set on both insert and update
- **Required Fields**:
  - `title`: The post's title
  - `content`: The main text content that will be vectorized for semantic search
  - `author`: The post's author name

## 🚀 Getting Started

1. **Clone & Install**
```bash
git clone <repository-url>
cd <project-directory>
pnpm install
```

2. **Initialize EdgeDB**
```bash
npx edgedb project init
```

3. **Generate Types**
```bash
pnpm generate
```

4. **Set up OpenAI API key in `.env.local`**

```bash
OPENAI_API_KEY=<your-api-key>
```

5. **Set up OpenAI API key in EdgeDB UI**

[](./assets/edgedb-ui.png)

4. **Start Development**
```bash
pnpm dev
```

## 🔧 Implementation Details

### Search

The template uses OpenAI's embeddings API to generate vector representations of the search query.
We then use EdgeDB's `ai` extension to search for posts that are semantically similar to the query.

```typescript
const searchResults = await client.query(`
    with query := <array<float32>><json>$query
    select ext::ai::search(Post, query);
`, {
  query: queryEmbedding
});
```

Check out the implementation in `app/api/posts/route.ts`.

## 📖 Learn More

- [EdgeDB AI Docs](https://docs.edgedb.com/ai)
- [Next.js Documentation](https://nextjs.org/docs)
