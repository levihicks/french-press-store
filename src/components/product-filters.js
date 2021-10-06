import { useState } from 'react';
import styled from 'styled-components';
import Category from './category';
import SortingInput from './sorting-input';
import NumberRangeInput from './number-range-input';
import * as SORTING_OPTIONS from '../constants/sorting-options';

const StyledProductFilters = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  position: relative;
`;

const CategoriesHeading = styled.div`
  color: ${(props) => props.theme.colors.darkGray};
`;

const ProductFilters = () => {
  const [categoryHover, setCategoryHover] = useState(false);
  const [sortedBy, setSortedBy] = useState(SORTING_OPTIONS.ALPHA_ASC);

  return (
    <StyledProductFilters>
      <div style={{ display: 'flex' }}>
        <CategoriesHeading>Filter by:</CategoriesHeading>
        <Category
          categoryHoverState={categoryHover}
          setCategoryHoverState={setCategoryHover}
          category="price"
        >
          <NumberRangeInput units="USD" />
        </Category>
        <Category
          categoryHoverState={categoryHover}
          setCategoryHoverState={setCategoryHover}
          category="weight"
        >
          <NumberRangeInput units="LBS" />
        </Category>
      </div>
      <div style={{ display: 'flex' }}>
        <CategoriesHeading>Sorted by:</CategoriesHeading>
        <Category
          categoryHoverState={categoryHover}
          setCategoryHoverState={setCategoryHover}
          category={sortedBy}
        >
          <SortingInput sortedBy={sortedBy} setSortedBy={setSortedBy} />
        </Category>
      </div>
    </StyledProductFilters>
  );
};

export default ProductFilters;
