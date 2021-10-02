import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ProductListItem from './product-list-item';

const FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    collections(first: 1, query: "Featured") {
      edges {
        node {
          products(first: 3) {
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
                      transformedSrc(
                        maxHeight: 300
                        maxWidth: 300
                        crop: CENTER
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const FeaturedText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin-top: 6rem;
  margin-bottom: 2rem;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: 2rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 700;
  }
`;

const FeaturedHeader = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  text-transform: uppercase;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const ViewAllLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px solid;
  font-weight: 700;
  color: inherit;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.xs};
  }
`;

const ProductsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 2rem 0;
  }
`;

const Featured = () => {
  const { data, loading, error } = useQuery(FEATURED_PRODUCTS);

  let featuredProducts;
  if (data) {
    console.log(data);
    featuredProducts = data.collections.edges[0]?.node.products.edges.map(
      (e) => e.node
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;

  return (
    <div>
      <FeaturedText>Make coffee that makes your day.</FeaturedText>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <FeaturedHeader>Featured</FeaturedHeader>
        <ViewAllLink to="/">View all products</ViewAllLink>
      </div>
      {featuredProducts && (
        <ProductsList>
          {featuredProducts.map((fp) => (
            <ProductListItem key={fp.title} product={fp} />
          ))}
        </ProductsList>
      )}
    </div>
  );
};

export default Featured;
