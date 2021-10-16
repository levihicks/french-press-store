import styled from 'styled-components';
import * as SORTING_OPTIONS from '../constants/sorting-options';

const SortingInputContainer = styled.div`
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-left: auto;
  }
`;

const InputOption = styled.div`
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  margin: 1rem 0;
  &:hover {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SortingInput = ({ setSortedBy }) => {
  return (
    <SortingInputContainer>
      {Object.values(SORTING_OPTIONS)
        .filter((el) => el !== SORTING_OPTIONS.PLACEHOLDER_TEXT)
        .map((el) => (
          <InputOption onClick={() => setSortedBy(el)} key={el}>
            {el}
          </InputOption>
        ))}
    </SortingInputContainer>
  );
};

export default SortingInput;
