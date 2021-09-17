import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ 
  uri: 'https://le-guerno-french-presses.myshopify.com/api/2021-07/graphql.json' 
});

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': 'b234cdaadc0b5221ea54e32cd0e82610'
  }
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div></div>
    </ApolloProvider>
  );
}

export default App;
