import styled from 'styled-components';
import ProductListItem from './product-list-item';

const StyledProductsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 2rem 0;
  }
`;

const NoResultsText = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
`;

const ProductsList = ({ products }) => {
  return (
    <StyledProductsList>
      {products.length > 0 ? (
        products.map((p) => <ProductListItem key={p.title} product={p} />)
      ) : (
        <NoResultsText>No results.</NoResultsText>
      )}
    </StyledProductsList>
  );
};

export default ProductsList;
