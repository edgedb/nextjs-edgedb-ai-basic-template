CREATE MIGRATION m172qo3bhweb3lsedlozp7dehw52xhm6qww2o22qdjlfwseyezyxta
    ONTO m1jrb6cckomginhzkemc3kvolfd7vsnozzuxmwta3hbsw3wg5n3era
{
  CREATE EXTENSION pgvector VERSION '0.5';
  CREATE EXTENSION ai VERSION '1.0';
  ALTER TYPE default::Post {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.content);
  };
};
