'use client';

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// Configure normal HTTP Link connecting to Spring Boot backend
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

// Configure normalized InMemoryCache with custom type policies for tutorial mastery
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Custom merging strategy for cursor connection pagination lab
        postsConnection: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!existing) return incoming;
            return {
              ...incoming,
              edges: [...(existing.edges || []), ...(incoming.edges || [])],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
