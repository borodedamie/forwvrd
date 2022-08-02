import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
// import { offsetLimitPagination } from "@apollo/client/utilities";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_CDA_TOKEN}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // cache: new InMemoryCache()
  cache: new InMemoryCache({
    typePolicies: {
        StoryCollection: {
            fields: {
              items: {
                merge(existing = [], incoming) {
                  return  [...existing, ...incoming ];
                }
              }
            }
        }
    }
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
