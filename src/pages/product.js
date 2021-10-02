import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { useState } from 'react';

const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      productType
      description
      title
      images(first: 3) {
        edges {
          node {
            transformedSrc
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            sku
            weight
            weightUnit
            price
          }
        }
      }
    }
  }
`;

const Breadcrumbs = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xs};
  margin: 1rem 0;

  & span {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const ProductImages = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: ${(props) => props.theme.breakpoints.lg};
  margin: 0 auto;
`;

const ImageNavigationButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
`;

const ProductImageContainer = styled.div`
  margin: 0 4rem;
`;

const Product = () => {
  let { handle } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
  });

  const [imageIndex, setImageIndex] = useState(0);

  let product = {};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;
  if (data) {
    ({
      description: product.description,
      productType: product.productType,
      title: product.title,
    } = data.productByHandle);

    ({
      price: product.price,
      sku: product.sku,
      weight: product.weight,
      weightUnit: product.weightUnit,
    } = data.productByHandle.variants.edges[0].node);
    product.images = data.productByHandle.images.edges.map(
      (e) => e.node.transformedSrc
    );
    console.log(product);
  }

  return (
    <div>
      <Breadcrumbs>
        Products / {product.productType} / <span>{product.title}</span>
      </Breadcrumbs>
      <ProductImages>
        <ImageNavigationButton
          onClick={() =>
            setImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))
          }
        >
          Prev
        </ImageNavigationButton>
        <ProductImageContainer>
          <img src={product.images[imageIndex]} height={450} alt="" />
        </ProductImageContainer>
        <ImageNavigationButton
          onClick={() =>
            setImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))
          }
        >
          Next
        </ImageNavigationButton>
      </ProductImages>
    </div>
  );
};

export default Product;
