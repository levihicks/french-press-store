import { useEffect, useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import storage from 'local-storage-fallback';
import theme from '../theme';
import Header from './header';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors[props.darkMode ? 'black' : 'white'] };
    color: ${props => props.theme.colors[props.darkMode ? 'white' : 'dark']};
    font-family: ${props => props.theme.fonts.sansBody}, sans-serif;
  }
`;

const getInitialMode = () => {
	const initialMode = storage.getItem('darkModeOn');
	return initialMode ? JSON.parse(initialMode) : false;
};

const Layout = ({ children }) => {
    const [darkModeOn, setDarkModeOn] = useState(getInitialMode);

    useEffect(() => {
        storage.setItem('theme', JSON.stringify(theme));
    }, [darkModeOn]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle darkMode={darkModeOn} />
            <Header darkModeOn={darkModeOn} setDarkModeOn={setDarkModeOn} />
            {children}
        </ThemeProvider>
    );
};

export default Layout;