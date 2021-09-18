import styled from 'styled-components';

import heroImg from '../assets/hero.jpg';

const StyledHero = styled.div`
  margin: 0 -1rem;
  background-image: url(${heroImg});
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.white};
`;

const StyledHeroSecondaryText = styled.div`
  width: 40%;
`;

const StyledHeroMainText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes['2xl']};
`;

const Hero = () => {
  return (
    <StyledHero>
      <div style={{ padding: '5rem 1rem' }}>
        <StyledHeroSecondaryText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </StyledHeroSecondaryText>
        <StyledHeroMainText>Lorem ipsum dolor sit amet.</StyledHeroMainText>
      </div>
    </StyledHero>
  );
};

export default Hero;
