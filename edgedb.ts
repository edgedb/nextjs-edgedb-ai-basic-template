import { createClient } from "edgedb";

export const client = createClient({
  tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
});
