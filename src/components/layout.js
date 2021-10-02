import { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import storage from 'local-storage-fallback';
import theme from '../theme';
import Header from './header';
import Footer from './footer.js';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${(props) =>
      props.theme.colors[props.darkMode ? 'black' : 'white']};
    font-family: ${(props) => props.theme.fonts.sansBody}, sans-serif;
  }
  * {
    color: ${(props) => props.theme.colors[props.darkMode ? 'white' : 'dark']};
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
  const [darkModeOn, setDarkModeOn] = useState(getInitialMode);

  useEffect(() => {
    storage.setItem('theme', JSON.stringify(theme));
  }, [darkModeOn]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle darkMode={darkModeOn} />
      <StyledContainer>
        <Header darkModeOn={darkModeOn} setDarkModeOn={setDarkModeOn} />
        {children}
        <Footer />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Layout;
