import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

const FooterHeading = styled.div`
  font-family: ${(props) => props.theme.fonts.sansHeadline};
  text-transform: uppercase;
  flex: 1;
  display: flex;
`;

const RightsReservedText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterHeading>Le Guerno French Presses</FooterHeading>
      <RightsReservedText>All rights reserved.</RightsReservedText>
      <FooterHeading style={{ justifyContent: 'flex-end' }}>
        {new Date().getFullYear()}
      </FooterHeading>
    </StyledFooter>
  );
};

export default Footer;
