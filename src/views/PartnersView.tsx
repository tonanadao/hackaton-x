import React from "react";
import styled from "styled-components";
import { PARTNERS } from "../styled/constants";
import ReactPlayer from "react-player";
import { MediaQuery } from "../hooks/useDeviceType";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${MediaQuery.isTablet} {
    padding: 20px 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px 0;
  }
`;

const Partners = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 120px;

  img {
    margin: 10px;
  }

  @media ${MediaQuery.isTablet} {
    justify-content: flex-start;
    margin-bottom: 60px;
  }

  @media ${MediaQuery.isMobile} {
    justify-content: flex-start;
    margin-bottom: 60px;
  }
`;

const VideoWrapper = styled.div`
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;

  div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const PartnersView = () => {
  return (
    <Container>
      <Partners>
        {PARTNERS.map((partner, index) => (
          <img src={partner.url.src} alt={partner.alt} key={index} />
        ))}
      </Partners>
      <VideoWrapper>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ddR0Uk1z1Fo"
          controls
        />
      </VideoWrapper>
    </Container>
  );
};

export default PartnersView;
