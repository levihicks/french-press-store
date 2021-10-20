import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import PouringCoffeeImage from '../assets/coffee-pouring.jpg';

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
            id
            sku
            weight
            weightUnit
            priceV2 {
              amount
              currencyCode
            }
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
  align-items: stretch;
  justify-content: space-between;
  margin: 0 auto;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    min-height: 70vh;
  }
`;

const Column = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-grow: 0;
  }
`;

const ImageNavigationButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: absolute;
    top: 0;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1 1 0;
  max-width: 50%;
  display: flex;
  justify-content: center;
  max-height: 450px;
  align-self: flex-start;
  overflow: hidden;
  & img {
    object-fit: contain;
  }
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-top: 20px;
    flex-grow: 1;
    max-width: 100%;
    & img {
      max-width: 100%;
    }
  }
`;

const MainInfoContainer = styled.div`
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: 1rem;
    ${(props) => props.hideOnMobile && 'display: none;'};
  }
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    ${(props) => props.hideOnDesktop && 'display: none;'};
  }
`;

const SKU = styled.div`
  font-weight: 700;
`;

const ProductPrice = styled.div`
  font-size: 2.5rem;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 1.5rem;
  }
`;

const ProductTitle = styled.div`
  text-transform: uppercase;
  overflow-wrap: anywhere;
  font-size: 2.5rem;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 1.5rem;
  }
`;

const AddToCartButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0;
  cursor: pointer;
`;

const ProductDescriptionContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ProductDescription = styled.div``;

const ProductDescriptionText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes.lg};
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const ProductDescriptionHeading = styled.div`
  margin-right: 2rem;
  display: inline-block;
  font-size: 1rem;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.sansHeadline};
`;

const Row = styled.div`
  margin-top: 4rem;
  display: flex;
`;

const SecondaryInfo = styled.div``;

const SecondaryInfoImageContainer = styled.div`
  height: 500px;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 220px;
  }
`;

const OriginText = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  text-transform: uppercase;
`;

const Product = () => {
  let { handle } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
  });

  const addToCartHandler = () => {
    dispatch(addToCart(data.productByHandle.variants.edges[0].node.id));
  };

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
      sku: product.sku,
      weight: product.weight,
      weightUnit: product.weightUnit,
    } = data.productByHandle.variants.edges[0].node);
    ({ amount: product.price, currencyCode: product.currencyCode } =
      data.productByHandle.variants.edges[0].node.priceV2);
    product.images = data.productByHandle.images.edges.map(
      (e) => e.node.transformedSrc
    );
  }

  return (
    <div>
      <Breadcrumbs>
        Products / {product.productType} / <span>{product.title}</span>
      </Breadcrumbs>
      <ProductImages>
        <Column>
          <ImageNavigationButton
            onClick={() =>
              setImageIndex((i) =>
                i === 0 ? product.images.length - 1 : i - 1
              )
            }
          >
            Prev
          </ImageNavigationButton>
          <MainInfoContainer hideOnMobile>
            <SKU>{product.sku}</SKU>
            <ProductTitle>{product.title}</ProductTitle>
          </MainInfoContainer>
        </Column>
        <ProductImageContainer>
          <img src={product.images[imageIndex]} alt="" />
        </ProductImageContainer>
        <Column>
          <ImageNavigationButton
            style={{ right: 0 }}
            onClick={() =>
              setImageIndex((i) =>
                i === product.images.length - 1 ? 0 : i + 1
              )
            }
          >
            Next
          </ImageNavigationButton>
          <MainInfoContainer
            hideOnMobile
            style={{ alignSelf: 'flex-end', textAlign: 'right' }}
          >
            <AddToCartButton onClick={addToCartHandler}>
              Add to cart
            </AddToCartButton>
            <ProductPrice>
              {Number(product.price).toFixed(2)} {product.currencyCode}
            </ProductPrice>
          </MainInfoContainer>
        </Column>
      </ProductImages>
      <Row style={{ flexDirection: 'column' }}>
        <MainInfoContainer hideOnDesktop>
          <SKU>{product.sku}</SKU>
          <ProductTitle>{product.title}</ProductTitle>
        </MainInfoContainer>
        <MainInfoContainer hideOnDesktop>
          <AddToCartButton>Add to cart</AddToCartButton>
          <ProductPrice>
            {Number(product.price).toFixed(2)} {product.currencyCode}
          </ProductPrice>
        </MainInfoContainer>
      </Row>
      <ProductDescription>
        <ProductDescriptionContainer>
          <ProductDescriptionHeading>description</ProductDescriptionHeading>
          <ProductDescriptionText>{product.description}</ProductDescriptionText>
        </ProductDescriptionContainer>
        <Row style={{ marginBottom: '5rem' }}>
          <SecondaryInfoImageContainer>
            <img src={PouringCoffeeImage} height="100%" alt="" />
          </SecondaryInfoImageContainer>
          <Column style={{ flexGrow: 0.2, margin: '0 auto', height: 'auto' }}>
            <SecondaryInfo>
              Microwave and dishwasher safe. Environmentally friendly: No paper
              filters or plastic capsules required.
            </SecondaryInfo>
            <OriginText>Made with love in France</OriginText>
          </Column>
        </Row>
      </ProductDescription>
    </div>
  );
};

export default Product;
