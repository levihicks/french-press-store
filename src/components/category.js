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
  background: ${(props) => props.theme.colors.white};
  display: flex;
`;

const Category = ({
  categoryHoverState,
  setCategoryHoverState,
  category,
  children,
}) => {
  return (
    <StyledCategory
      onMouseEnter={() => setCategoryHoverState(category)}
      onMouseLeave={() => setCategoryHoverState(false)}
    >
      {category} <span className="category-arrow">▲</span>
      {categoryHoverState === category && (
        <CategoryOptions>{children}</CategoryOptions>
      )}
    </StyledCategory>
  );
};

export default Category;
