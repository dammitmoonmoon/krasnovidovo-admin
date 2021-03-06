import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
        ssrMode: true,
        link: new HttpLink({
            uri: GRAPHQL_ENDPOINT,
            credentials: 'include',
        }),
        cache: cache.restore((window as any).__APOLLO_STATE__),
    });

export { apolloClient };
