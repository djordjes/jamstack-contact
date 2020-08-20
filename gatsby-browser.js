import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const headers = {};

if (process.env.FAUNADB_SERVER_SECRET) {
  headers.authorization = `Bearer ${process.env.FAUNADB_SERVER_SECRET}`;
}

const client = new ApolloClient({
  uri: process.env.FAUNA_URI,
  cache: new InMemoryCache(),
  headers,
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
