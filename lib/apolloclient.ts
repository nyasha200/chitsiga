import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: "network-only",
        },
        watchQuery: {
            fetchPolicy: "network-only",
        },
    },
});

export default apolloClient;