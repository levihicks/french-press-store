import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledProductListItem = styled.div`
  width: 300px;
  cursor: pointer;
  margin: 1rem;
`;

const HoverImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
`;

const ImagesContainer = styled.div`
  overflow: hidden;
  position: relative;
  z-index: -1;
  max-height: 300px;
`;

const ProductListItem = ({ product }) => {
  let history = useHistory();
  const [hover, setHover] = useState(false);

  return (
    <StyledProductListItem
      key={product.title}
      style={{ width: '300px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => history.push(`/products/${product.handle}`)}
    >
      <ImagesContainer>
        <img
          src={product.images.edges[0].node.transformedSrc}
          alt=""
          style={{ filter: hover ? 'blur(2px) grayscale(100%)' : 'none' }}
        />
        {hover && (
          <HoverImageContainer>
            <img
              src={product.images.edges[0].node.transformedSrc}
              alt=""
              height={150}
            />
          </HoverImageContainer>
        )}
      </ImagesContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textTransform: 'uppercase' }}>{product.title}</div>
        <div>
          {Number(product.priceRange.maxVariantPrice.amount).toFixed(2)}{' '}
          {product.priceRange.maxVariantPrice.currencyCode}
        </div>
      </div>
    </StyledProductListItem>
  );
};

export default ProductListItem;
