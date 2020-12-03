import React from 'react';
import App from './App';
import { InMemoryCache, createHttpLink, ApolloProvider, ApolloClient } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const Apollo = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default Apollo;