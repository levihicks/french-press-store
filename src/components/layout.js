import { useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import storage from 'local-storage-fallback';
import { setDarkMode } from '../store/themeSlice';
import theme from '../theme';
import Header from './header';
import Footer from './footer.js';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${(props) => props.backgroundColor};
    font-family: ${(props) => props.theme.fonts.sansBody}, sans-serif;
  }
  * {
    color: ${(props) => props.textColor};
  }
`;

const getInitialMode = () => {
  const initialMode = storage.getItem('darkModeOn');
  return initialMode ? JSON.parse(initialMode) : false;
};

const StyledContainer = styled.div`
  padding: 0 1rem;
  padding-top: 90px;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding-top: 50px;
  }
`;

const Layout = ({ children }) => {
  const { backgroundColor, textColor, darkModeOn } = useSelector(
    (state) => state.theme
  );
  const dispatch = useDispatch();

  useEffect(() => dispatch(setDarkMode(getInitialMode())), [dispatch]);

  useEffect(() => {
    storage.setItem('darkModeOn', JSON.stringify(darkModeOn));
  }, [darkModeOn]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle backgroundColor={backgroundColor} textColor={textColor} />
      <StyledContainer>
        <Header />
        {children}
        <Footer />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Layout;
