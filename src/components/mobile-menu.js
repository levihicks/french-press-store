import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faToggleOn,
  faToggleOff,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { setDarkMode } from '../store/themeSlice';

const StyledMobileMenu = styled.div`
  background: ${(props) => props.backgroundColor};
  position: fixed;
  margin-top: -1px;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuItem = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
  & > * {
    padding-right: 0.5rem;
  }
`;

const MobileMenuLink = styled.div``;

const MobileMenu = ({ setMobileMenuActive }) => {
  const { darkModeOn } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { backgroundColor } = useSelector((state) => state.theme);

  const history = useHistory();

  const navigateHandler = (route) => {
    history.push(route);
    setMobileMenuActive(false);
  };

  return (
    <StyledMobileMenu backgroundColor={backgroundColor}>
      <div style={{ padding: '0 1rem' }}>
        <MobileMenuItem>
          <MobileMenuLink onClick={() => navigateHandler(ROUTES.SEARCH)}>
            Search
          </MobileMenuLink>
        </MobileMenuItem>
        <MobileMenuItem>
          <MobileMenuLink onClick={() => navigateHandler(ROUTES.PRODUCTS)}>
            Products
          </MobileMenuLink>
        </MobileMenuItem>
        <MobileMenuItem>
          <FontAwesomeIcon icon={faSun} size="xs" />
          <FontAwesomeIcon
            onClick={() => dispatch(setDarkMode(!darkModeOn))}
            icon={darkModeOn ? faToggleOn : faToggleOff}
          />
          <FontAwesomeIcon icon={faMoon} size="xs" />
        </MobileMenuItem>
        <MobileMenuItem
          onClick={() => setMobileMenuActive(false)}
          style={{ position: 'fixed', bottom: '2rem' }}
        >
          <FontAwesomeIcon icon={faWindowClose} size="xs" />
          Close
        </MobileMenuItem>
      </div>
    </StyledMobileMenu>
  );
};

export default MobileMenu;
