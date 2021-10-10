import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Layout from './components/layout';
import Home from './pages/home';
import Product from './pages/product';
import Products from './pages/products';
import Search from './pages/search';
import { Provider } from 'react-redux';
import { store } from './store';

const httpLink = createHttpLink({
  uri: 'https://le-guerno-french-presses.myshopify.com/api/2021-07/graphql.json',
});

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': 'b234cdaadc0b5221ea54e32cd0e82610',
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Switch>
              <Route path={ROUTES.PRODUCT}>
                <Product />
              </Route>
              <Route path={ROUTES.PRODUCTS}>
                <Products />
              </Route>
              <Route path={ROUTES.SEARCH}>
                <Search />
              </Route>
              <Route path={ROUTES.HOME}>
                <Home />
              </Route>
            </Switch>
          </Layout>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
