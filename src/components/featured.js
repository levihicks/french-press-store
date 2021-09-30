import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    collections(first: 1, query: "Featured") {
      edges {
        node {
          products(first: 3) {
            edges {
              node {
                title
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
`;

const FeaturedHeader = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-transform: uppercase;
`;

const ViewAllLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px solid white;
  font-weight: 700;
`;

const ProductsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
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
            <div key={fp.title} style={{ width: '300px' }}>
              <img src={fp.images.edges[0].node.transformedSrc} alt="" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textTransform: 'uppercase' }}>{fp.title}</div>
                <div>
                  {Number(fp.priceRange.maxVariantPrice.amount).toFixed(2)}{' '}
                  {fp.priceRange.maxVariantPrice.currencyCode}
                </div>
              </div>
            </div>
          ))}
        </ProductsList>
      )}
    </div>
  );
};

export default Featured;
