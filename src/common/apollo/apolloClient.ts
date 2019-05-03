import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client'


const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
        ssrMode: true,
        link: createUploadLink({
            uri: GRAPHQL_ENDPOINT,
            credentials: 'include',
        }),
        cache: cache.restore((window as any).__APOLLO_STATE__),
    });

export { apolloClient };
