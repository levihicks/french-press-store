import { useState, useEffect } from 'react';
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
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    & > div {
      margin-bottom: 1rem;
    }
  }
`;

const CategoriesHeading = styled.div`
  color: ${(props) => props.theme.colors.darkGray};
`;

const ProductFilters = ({ setFilters, setSorting }) => {
  const [categoryHover, setCategoryHover] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [weightFilter, setWeightFilter] = useState({ min: '', max: '' });
  const [sortedBy, setSortedBy] = useState(SORTING_OPTIONS.PLACEHOLDER_TEXT);

  useEffect(() => {
    setFilters({ price: priceFilter, weight: weightFilter });
    setCategoryHover(false);
  }, [priceFilter, weightFilter, setFilters]);

  useEffect(() => {
    setSorting(sortedBy);
    setCategoryHover(false);
  }, [setSorting, sortedBy]);

  const clearAll = () => {
    setPriceFilter({ min: '', max: '' });
    setWeightFilter({ min: '', max: '' });
  };

  return (
    <StyledProductFilters onMouseLeave={() => setCategoryHover(false)}>
      <div style={{ display: 'flex' }}>
        <CategoriesHeading>Filter by:</CategoriesHeading>
        <Category
          categoryHoverState={categoryHover}
          setCategoryHoverState={setCategoryHover}
          category="price"
          clearAll={clearAll}
        >
          <NumberRangeInput
            units="USD"
            filter={priceFilter}
            setFilter={setPriceFilter}
          />
        </Category>
        <Category
          categoryHoverState={categoryHover}
          setCategoryHoverState={setCategoryHover}
          category="weight"
          clearAll={clearAll}
        >
          <NumberRangeInput
            units="LBS"
            filter={weightFilter}
            setFilter={setWeightFilter}
          />
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
