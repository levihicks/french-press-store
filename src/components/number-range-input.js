import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './button';

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid;
  background: inherit;
  -moz-appearance: textfield;
  outline: none;
  font-size: 1.25rem;
  font-weight: 700;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const InputErrorMessage = styled.div`
  color: salmon;
`;

const StyledNumberRangeInput = styled.div``;

const NumberRangeInput = ({ units, filter, setFilter }) => {
  const [inputError, setInputError] = useState(false);
  const [inputValues, setInputValues] = useState(filter);

  useEffect(() => {
    setInputValues(filter);
  }, [filter]);

  const inputValid = (min, max) =>
    (Number(max) > Number(min) || max === '' || min === '') && Number(min) >= 0;

  const clickHandler = () => {
    if (!inputValid(inputValues.min, inputValues.max)) {
      setInputError(true);
      return;
    } else if (inputError) setInputError(false);
    setFilter({
      min: inputValues.min === '' ? '' : Number(inputValues.min),
      max: inputValues.max === '' ? '' : Number(inputValues.max),
    });
  };

  return (
    <StyledNumberRangeInput>
      <div>
        <StyledInput
          value={inputValues.min}
          onChange={(e) =>
            setInputValues({ ...inputValues, min: e.target.value })
          }
          type="number"
        />{' '}
        {units} to{' '}
        <StyledInput
          value={inputValues.max}
          onChange={(e) =>
            setInputValues((vals) => {
              return { ...vals, max: e.target.value };
            })
          }
          type="number"
        />{' '}
        {units}
        {inputError && (
          <InputErrorMessage>
            Error: Input invalid. Please enter a new value.
          </InputErrorMessage>
        )}
      </div>
      <Button click={clickHandler}>Apply</Button>
    </StyledNumberRangeInput>
  );
};

export default NumberRangeInput;
