import styled from 'styled-components';
import heroImg from '../assets/hero.jpg';

const StyledHero = styled.div`
  margin: 0 -1rem;
  background-image: url(${heroImg});
  background-position: center;
  background-size: cover;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.white};
  text-shadow: 1px 1px 5px ${(props) => props.theme.colors.black};
`;

const StyledHeroInnerContainer = styled.div`
  padding: 5rem 1rem;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding 2rem 1rem;
  }
`;

const StyledHeroSecondaryText = styled.div`
  width: 40%;
`;

const StyledHeroMainText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const Hero = () => {
  return (
    <StyledHero>
      <StyledHeroInnerContainer>
        <StyledHeroSecondaryText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </StyledHeroSecondaryText>
        <StyledHeroMainText>Lorem ipsum dolor sit amet.</StyledHeroMainText>
      </StyledHeroInnerContainer>
    </StyledHero>
  );
};

export default Hero;
