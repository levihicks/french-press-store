import styled from 'styled-components';
import * as SORTING_OPTIONS from '../constants/sorting-options';

const InputOption = styled.div`
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  margin: 1rem 0;
  &:hover {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SortingInput = ({ sortedBy, setSortedBy }) => {
  return (
    <div style={{ marginLeft: 'auto' }}>
      {Object.values(SORTING_OPTIONS).map((el) => (
        <InputOption key={el}>{el}</InputOption>
      ))}
    </div>
  );
};

export default SortingInput;
