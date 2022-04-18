import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PARTNERS } from "../styled/constants";
import ReactPlayer from "react-player/youtube";
import { MediaQuery } from "../hooks/useDeviceType";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${MediaQuery.isTablet} {
    padding: 20px 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px 10px;
  }
`;

const Partners = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 120px;

  img {
    /* height: 40px; */
    height: 80px;
    margin: 10px;
  }

  @media ${MediaQuery.isTablet} {
    justify-content: center;
    margin-bottom: 60px;

    img {
      margin: 20px;
    }
  }

  @media ${MediaQuery.isMobile} {
    justify-content: center;
    margin-bottom: 60px;

    img {
      height: 30px;
      margin: 20px;
    }
  }
`;

const VideoWrapper = styled.div`
  max-width: 1000px;
  /* height: 400px; */
  margin: 0 auto;

  div {
    width: 100% !important;
    height: 100% !important;
  }

  video {
    width: 100% !important;
  }

  @media ${MediaQuery.isMobile} {
    height: 200px;
  }
`;

const PartnersView = () => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <Container>
      <Partners id="partners">
        {PARTNERS.map((partner, index) => (
          <img src={partner.url} alt={partner.alt} key={index} />
        ))}
      </Partners>
      <VideoWrapper>
        {/* {hasWindow && (
          <ReactPlayer
            url="https://d3spduprfob5fw.cloudfront.net/blockczech/blocktalk/blocktalk_intro_1-min.mp4"
            controls
          />
        )} */}
        <video controls>
          <source
            src="https://d3spduprfob5fw.cloudfront.net/blockczech/blocktalk/blocktalk_intro_1-min.mp4"
            type="video/mp4"
          />
        </video>
      </VideoWrapper>
    </Container>
  );
};

export default PartnersView;
