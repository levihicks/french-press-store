import styled from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
  border: none;
  border-bottom: 2px solid;
  padding: 0;
  font-weight: 700;
  background: none;
  cursor: pointer;
`;

const Button = ({ click, children, className }) => {
  return (
    <StyledButton className={className} onClick={click}>
      {children}
    </StyledButton>
  );
};

export default Button;
