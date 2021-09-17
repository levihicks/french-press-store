const Header = ({ darkModeOn, setDarkModeOn }) => {
    return (
        <div>
            Header. 
            <div onClick={() => setDarkModeOn(!darkModeOn)}>
                {darkModeOn ? '(Change to light mode)' : '(Change to dark mode)'}
            </div>
        </div>
    );
};

export default Header;