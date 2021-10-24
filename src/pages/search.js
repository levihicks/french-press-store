import { useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductsList from '../components/products-list';

const Searchbox = styled.div`
  border-bottom: 2px solid;
  padding: 2px 0;
  display: flex;
  align-items: center;
`;

const SearchboxInput = styled.input`
  font-size: ${(props) => props.theme.fontSizes.md};
  background: none;
  outline: none;
  border: none;
  overflow: hidden;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: 1rem;
  }
`;

const GET_PRODUCTS = gql`
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

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;
  let products;
  if (data) {
    products = data.products.edges.map((el) => el.node);
    products = products.filter((p) =>
      p.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  return (
    <div>
      <Searchbox>
        <FontAwesomeIcon icon={faSearch} />
        <SearchboxInput
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
      </Searchbox>
      {searchInput !== '' && <ProductsList products={products} />}
    </div>
  );
};

export default Search;
