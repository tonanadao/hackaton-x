import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PARTNERS } from "../styled/constants";
import ReactPlayer from "react-player/youtube";
import { MediaQuery } from "../hooks/useDeviceType";
import { HeadingLogo } from "../styled/common/heading";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${MediaQuery.isTablet} {
    padding: 20px 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px;
  }
`;

const Partners = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;

  img {
    /* height: 40px; */
    height: 80px;
    margin: 10px 20px;
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
  margin: 0 auto 120px;

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

const Webinar = styled.section`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 120px;

  article {
    background: #0c0c53;
    padding: 30px;
    border-radius: 30px;

    h2 {
      margin-bottom: 20px;
    }
  }

  @media ${MediaQuery.isTablet} {
    grid-template-columns: 1fr;
  }

  @media ${MediaQuery.isMobile} {
    grid-template-columns: 1fr;
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
      <HeadingLogo style={{ textAlign: "center" }}>
        Who is the event for?
      </HeadingLogo>
      <Webinar>
        <article>
          <h2>Game developers</h2>
          <p>
            Upgrade your leadership skills and take your career to a new high
            level
          </p>
        </article>
        <article>
          <h2>Blockchain Enthusiasts</h2>
          <p>
            Master the skills of accumulated experience and increase the
            professional level
          </p>
        </article>
        <article>
          <h2>VC Incubators</h2>
          <p>
            Attract customers and make useful connections with like-minded
            people
          </p>
        </article>
      </Webinar>
      <Partners id="partners">
        {PARTNERS.map((partner, index) => (
          <img src={partner.url} alt={partner.alt} key={index} />
        ))}
      </Partners>
    </Container>
  );
};

export default PartnersView;
