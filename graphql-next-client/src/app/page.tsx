import React from 'react';
import { ApolloClientProvider } from '../components/ApolloClientProvider';
import { MainHub } from '../components/MainHub';

export default function Home() {
  return (
    <ApolloClientProvider>
      <MainHub />
    </ApolloClientProvider>
  );
}
