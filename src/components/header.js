import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../store/themeSlice';
import * as ROUTES from '../constants/routes';
import MobileMenu from './mobile-menu';

const StyledHeader = styled.div`
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.backgroundColor};
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
  border-bottom: 3px solid;
  ${(props) => props.darkModeOn !== props.darkButton && 'border: none;'}
  margin: 0;
`;

const HeaderTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.sansHeadline}, sans-serif;
  cursor: pointer;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.xs};
    margin: 1rem 0;
  }
`;

const Header = () => {
  const { darkModeOn, backgroundColor } = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const navigateHandler = (route) => {
    history.push(route);
    setMobileMenuActive(false);
  };

  return (
    <>
      <StyledHeader backgroundColor={backgroundColor}>
        <HeaderColumn style={{ justifyContent: 'flex-start' }}>
          <MenuButton onClick={() => setMobileMenuActive((val) => !val)}>
            MENU
          </MenuButton>
          <DarkModeButtons>
            <DarkModeButton
              darkModeOn={darkModeOn}
              darkButton={true}
              onClick={() => dispatch(setDarkMode(true))}
            >
              DARK
            </DarkModeButton>
            /
            <DarkModeButton
              darkModeOn={darkModeOn}
              darkButton={false}
              onClick={() => dispatch(setDarkMode(false))}
            >
              LIGHT
            </DarkModeButton>
          </DarkModeButtons>
        </HeaderColumn>
        <HeaderColumn style={{ flexGrow: 1, whiteSpace: 'nowrap' }}>
          <HeaderTitle onClick={() => navigateHandler(ROUTES.HOME)}>
            LE GUERNO FRENCH PRESSES
          </HeaderTitle>
        </HeaderColumn>
        <HeaderColumn style={{ justifyContent: 'flex-end' }}>
          <StyledButton
            style={{ paddingRight: '1rem' }}
            onClick={() => navigateHandler(ROUTES.SEARCH)}
          >
            SEARCH
          </StyledButton>
          <StyledButton
            onClick={() => navigateHandler(ROUTES.CART)}
            displayOnMobile
          >
            CART ({cart.length})
          </StyledButton>
        </HeaderColumn>
      </StyledHeader>
      {mobileMenuActive && (
        <MobileMenu
          setMobileMenuActive={setMobileMenuActive}
          navigateHandler={navigateHandler}
        />
      )}
    </>
  );
};

export default Header;
