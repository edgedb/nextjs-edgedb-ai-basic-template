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