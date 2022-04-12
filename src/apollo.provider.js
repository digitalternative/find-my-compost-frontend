import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

let token = "";
if (localStorage.getItem("store")) {
  const store = JSON.parse(localStorage.getItem("store"));
  token = store.token;
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:3000/graphql",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    fetchPolicy: "no-cache",
  },
});
