import styled from 'styled-components';

const StyledHeader = styled.div`
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.darkModeOn ? props.theme.colors.black : props.theme.colors.white};
`;

const HeaderColumn = styled.div`
  padding: 0 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: ${(props) => (props.displayOnMobile ? 'default' : 'none')};
    font-size: ${(props) => props.theme.fontSizes.xs};
    font-weight: 700;
  }
`;

const MenuButton = styled(StyledButton)`
  display: none;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: inline-block;
  }
`;

const DarkModeButtons = styled.div`
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const DarkModeButton = styled(StyledButton)`
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) =>
      props.darkButton ? props.theme.colors.white : props.theme.colors.black};
  ${(props) => props.darkModeOn !== props.darkButton && 'border: none;'}
  margin: 0;
`;

const HeaderTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.sansHeadline}, sans-serif;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.xs};
    margin: 1rem 0;
  }
`;

const Header = ({ darkModeOn, setDarkModeOn }) => {
  return (
    <StyledHeader darkModeOn={darkModeOn}>
      <HeaderColumn style={{ justifyContent: 'flex-start' }}>
        <MenuButton>MENU</MenuButton>
        <DarkModeButtons>
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
        </DarkModeButtons>
      </HeaderColumn>
      <HeaderColumn style={{ flexGrow: 1, whiteSpace: 'nowrap' }}>
        <HeaderTitle>LE GUERNO FRENCH PRESSES</HeaderTitle>
      </HeaderColumn>
      <HeaderColumn style={{ justifyContent: 'flex-end' }}>
        <StyledButton style={{ paddingRight: '1rem' }}>SEARCH</StyledButton>
        <StyledButton displayOnMobile>CART (0)</StyledButton>
      </HeaderColumn>
    </StyledHeader>
  );
};

export default Header;
