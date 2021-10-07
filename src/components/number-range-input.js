import styled from 'styled-components';
import Button from './button';

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid;
  background: inherit;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const StyledNumberRangeInput = styled.div`
  margin-top: 2rem;
`;

const NumberRangeInput = ({ units }) => {
  return (
    <StyledNumberRangeInput>
      <div>
        <StyledInput type="number" /> {units} to <StyledInput type="number" />{' '}
        {units}
      </div>
      <Button click={() => {}}>Apply</Button>
    </StyledNumberRangeInput>
  );
};

export default NumberRangeInput;
