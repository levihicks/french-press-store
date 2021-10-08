import { useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import ProductFilters from '../components/product-filters';
import ProductsList from '../components/products-list';
import * as SORTING_OPTIONS from '../constants/sorting-options';

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
          variants(first: 1) {
            edges {
              node {
                weight
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
  const [filters, setFilters] = useState({
    price: { min: '', max: '' },
    weight: { min: '', max: '' },
  });

  const [sorting, setSorting] = useState(null);

  let { data, loading, error } = useQuery(PRODUCTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;

  let products;

  if (data) {
    products = data.products.edges.map((el) => el.node);

    products = products.filter((p) => {
      let price = p.priceRange.maxVariantPrice.amount;
      let weight = p.variants.edges[0].node.weight;
      if (filters.price.min !== '' && price < filters.price.min) return false;
      if (filters.price.max !== '' && price > filters.price.max) return false;
      if (filters.weight.min !== '' && weight < filters.weight.min)
        return false;
      if (filters.weight.max !== '' && weight > filters.weight.max)
        return false;
      else return true;
    });

    if (sorting) {
      let numSort =
        sorting === SORTING_OPTIONS.PRICE_ASC ||
        sorting === SORTING_OPTIONS.PRICE_DESC;

      products.sort(
        numSort
          ? (a, b) =>
              a.priceRange.maxVariantPrice.amount -
              b.priceRange.maxVariantPrice.amount
          : (a, b) => {
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
              else return 0;
            }
      );

      if (
        sorting === SORTING_OPTIONS.PRICE_DESC ||
        sorting === SORTING_OPTIONS.ALPHA_DESC
      )
        products.reverse();
    }
  }

  return (
    <div>
      <ProductsHeader>PRODUCTS</ProductsHeader>
      <ProductFilters setFilters={setFilters} setSorting={setSorting} />
      <ProductsList products={products} />
    </div>
  );
};

export default Products;
