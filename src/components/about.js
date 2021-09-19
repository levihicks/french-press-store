import styled from 'styled-components';
import aboutImg1 from '../assets/about1.jpg';
import aboutImg2 from '../assets/about2.jpg';

const StyledAbout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const AboutHeading = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline}, sans-serif;
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const AboutBodyText = styled.div`
  display: flex;
  width: 50%;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const StyledImg = styled.img`
  height: auto;
`;

const About = () => {
  return (
    <StyledAbout>
      <Row>
        <AboutHeading>About</AboutHeading>
        <AboutBodyText>
          <div>
            Pellentesque dignissim enim sit amet. Sit amet consectetur
            adipiscing elit ut aliquam purus sit amet. Tortor posuere ac ut
            consequat semper. Nec ultrices dui sapien eget mi. Etiam tempor orci
            eu lobortis elementum nibh tellus molestie nunc.
          </div>
          <div>
            Hendrerit dolor magna eget est lorem ipsum. Fames ac turpis egestas
            integer eget aliquet. Pellentesque habitant morbi tristique
            senectus. Neque aliquam vestibulum morbi blandit. Viverra
            suspendisse potenti nullam ac tortor.
          </div>
        </AboutBodyText>
      </Row>
      <Row>
        <StyledImg
          style={{ maxWidth: '33%' }}
          src={aboutImg1}
          alt="Cup of coffee."
        />
        <StyledImg
          style={{ maxWidth: '65%' }}
          src={aboutImg2}
          alt="French press."
        />
      </Row>
    </StyledAbout>
  );
};

export default About;
