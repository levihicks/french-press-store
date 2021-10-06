import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import ProductFilters from '../components/product-filters';
import ProductsList from '../components/products-list';

const PRODUCTS = gql`
  query GetProducts {
    products(first: 20) {
      edges {
        node {
          title
          handle
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc(maxHeight: 300, maxWidth: 300, crop: CENTER)
              }
            }
          }
        }
      }
    }
  }
`;

const ProductsHeader = styled.h1`
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

const Products = () => {
  let { data, loading, error } = useQuery(PRODUCTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;

  return (
    <div>
      <ProductsHeader>PRODUCTS</ProductsHeader>
      <ProductFilters />
      <ProductsList products={data.products.edges.map((el) => el.node)} />
    </div>
  );
};

export default Products;
