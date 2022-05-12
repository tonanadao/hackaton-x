import React from "react";
import styled from "styled-components";
import { MediaQuery } from "../hooks/useDeviceType";

import youtube from "../../public/images/youtube2.svg";
import linkedIn from "../../public/images/linkedIn2.svg";
import doodle from "../../public/images/doodle.svg";
import { DODGERBLUE } from "../styled/colors";

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media ${MediaQuery.isTablet} {
    padding: 40px;
    grid-template-columns: 1fr;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px;
    grid-template-columns: 1fr;
  }
`;

const Broadcast = styled.article`
  h1 {
    margin-bottom: 20px;
  }

  p {
    color: #5a5a86;
  }
`;

const DoodleWord = styled.u`
  position: relative;
  text-decoration: none;

  p {
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    position: absolute;
    top: -4px;
    left: 0;
    width: 122px;
  }
`;

const VideoWrapper = styled.figure`
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

const Buttons = styled.div`
  display: flex;
  margin-top: 40px;

  a {
    border: 1px solid white;
    text-decoration: none;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-right: 10px;

    &:hover {
      background-color: ${DODGERBLUE.toString()};
    }
  }

  img {
    margin-right: 10px;
  }
`;

const BroadcastView = () => {
  return (
    <Container>
      <Broadcast>
        <h1>
          Watch the {""}
          <DoodleWord>
            broadcast {""}
            <img src={doodle.src} alt="doodle" />
          </DoodleWord>
          exclusively on linkedIn and youtube
        </h1>
        {/* <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum
        </p> */}
        <Buttons>
          <a
            href="https://www.youtube.com/channel/UCpmXUgn9sIznAGlmjHjZ2DA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube.src} alt="Youtube" />
            View on Youtube
          </a>
          <a
            href="https://www.linkedin.com/video/event/urn:li:ugcPost:6929711310305665024/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedIn.src} alt="LinkedIn" />
            View on LinkedIn
          </a>
        </Buttons>
      </Broadcast>
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

export default BroadcastView;
