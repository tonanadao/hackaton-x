import React from "react";
import { Heading01 } from "../styled/common/heading";
import styled from "styled-components";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { MediaQuery } from "../hooks/useDeviceType";

import square from "../../public/images/blue_square.svg";
import photo from "../../public/images/photo.svg";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;

  p {
    max-width: 75%;
    margin: 0 auto;
  }

  @media ${MediaQuery.isTablet} {
    padding: 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 40px 0;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  img {
    margin-right: 30px;
  }
`;

const Photos = styled.section`
  margin: 100px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${MediaQuery.isTablet} {
    grid-template-columns: 1fr;
    grid-gap: 5rem;
    justify-items: center;
  }

  @media ${MediaQuery.isMobile} {
    grid-template-columns: 1fr;
    grid-gap: 5rem;
    justify-items: center;
  }
`;

const Photo = styled.figure`
  max-height: 210px;
  max-width: 340px;

  img {
    height: 100%;
    width: 100%;
  }

  figcaption {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const IconWrapper = styled.figure`
  height: 20px;
  width: 20px;
  margin-right: 10px;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const BlockTalkView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <Heading01>BLOCK TALK</Heading01>
      </Heading>
      <p>
        Block Talk is both in person and virtual meeting of blockchain-based
        game enthusiasts, investors, software developers with the aim of sharing
        knowledge in the professional community and networking to find business
        partners, co-founders, teammates and like-minded people.
      </p>
      <Photos>
        <Photo>
          <img src={photo.src} alt="Photo" />
          <figcaption>
            <IconWrapper>
              <LocationMarkerIcon />
            </IconWrapper>
            <caption>Prague</caption>
          </figcaption>
        </Photo>
        <Photo>
          <img src={photo.src} alt="Photo" />
          <figcaption>
            <IconWrapper>
              <LocationMarkerIcon />
            </IconWrapper>
            <caption>Prague</caption>
          </figcaption>
        </Photo>
        <Photo>
          <img src={photo.src} alt="Photo" />
          <figcaption>
            <IconWrapper>
              <LocationMarkerIcon />
            </IconWrapper>
            <caption>Prague</caption>
          </figcaption>
        </Photo>
      </Photos>
    </Container>
  );
};

export default BlockTalkView;
