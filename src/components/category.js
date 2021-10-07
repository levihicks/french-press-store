import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledCategory = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  & .category-arrow {
    font-size: ${(props) => props.theme.fontSizes.xs};
    margin-left: 0.2rem;
  }
  &:hover .category-arrow {
    display: inline-block;
    transform: rotate(180deg);
  }
`;

const CategoryOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 300px;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  display: flex;
`;

const Category = ({
  categoryHoverState,
  setCategoryHoverState,
  category,
  children,
}) => {
  const { backgroundColor, textColor } = useSelector((state) => state.theme);
  return (
    <StyledCategory
      onMouseEnter={() => setCategoryHoverState(category)}
      onMouseLeave={() => setCategoryHoverState(false)}
    >
      {category} <span className="category-arrow">▲</span>
      {categoryHoverState === category && (
        <CategoryOptions
          backgroundColor={backgroundColor}
          textColor={textColor}
        >
          {children}
        </CategoryOptions>
      )}
    </StyledCategory>
  );
};

export default Category;
