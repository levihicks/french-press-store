import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) =>
    props.darkModeOn ? props.theme.colors.black : props.theme.colors.white};
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  margin: 0 1rem;
`;

const DarkModeButton = styled(StyledButton)`
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) =>
      props.darkButton ? props.theme.colors.white : props.theme.colors.black};
  ${(props) => props.darkModeOn !== props.darkButton && 'border: none;'}
`;

const HeaderTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.sansHeadline}, sans-serif;
`;

const Header = ({ darkModeOn, setDarkModeOn }) => {
  return (
    <StyledHeader darkModeOn={darkModeOn}>
      <div>
        <DarkModeButton
          darkModeOn={darkModeOn}
          darkButton={true}
          onClick={() => setDarkModeOn(true)}
        >
          DARK
        </DarkModeButton>
        /
        <DarkModeButton
          darkModeOn={darkModeOn}
          darkButton={false}
          onClick={() => setDarkModeOn(false)}
        >
          LIGHT
        </DarkModeButton>
      </div>
      <HeaderTitle>LE GUERNO FRENCH PRESSES</HeaderTitle>
      <div>
        <StyledButton>SEARCH</StyledButton>
        <StyledButton>CART (0)</StyledButton>
      </div>
    </StyledHeader>
  );
};

export default Header;
