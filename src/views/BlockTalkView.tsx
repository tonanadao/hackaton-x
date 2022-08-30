import React from "react";
import { Heading01 } from "../styled/common/heading";
import styled from "styled-components";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { MediaQuery } from "../hooks/useDeviceType";
import { DODGERBLUE } from "../styled/colors";
import Link from "next/link";

import square2 from "../../public/images/purple_square.svg";
import photo from "../../public/images/photo.svg";
import photo1 from "../../public/images/photo1.svg";
import photo2 from "../../public/images/photo2.svg";
import logo from "../../public/images/blocktalk_logo.svg";

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;

  @media ${MediaQuery.isTablet} {
    padding: 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px;
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
  height: 210px;
  width: 340px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  figcaption {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  margin: 40px 0 120px;
  display: flex;
  justify-content: center;

  a {
    margin: 0 10px;
    text-decoration: none;
    background-color: ${DODGERBLUE.toString()};
    color: white;
    min-width: 164px;
    height: 44px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const HeadingLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  img {
    height: 61px;
  }

  .logo {
    height: 120px;
    margin-right: 30px;
  }

  @media ${MediaQuery.isTablet} {
    img {
      height: 41px;
    }

    .logo {
      height: 80px;
      margin-right: 20px;
    }
  }

  @media ${MediaQuery.isMobile} {
    img {
      height: 31px;
    }

    .logo {
      height: 60px;
      margin-right: 10px;
    }
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
      <HeadingLogo>
        <Heading01>Hack-a-TON x Prague</Heading01>
      </HeadingLogo>
      <p style={{ maxWidth: "75%", margin: "0 auto" }}>
        Hack-a-TON x Prague is a startup & coding event that brings experts and
        students together to prototype new GameFi, DeFi & DAO products on TON
        Blockchain.
      </p>

      <Photos>
        <Photo>
          <img src={photo2.src} alt="Photo" />
          {/* <figcaption>
            <IconWrapper>
              <LocationMarkerIcon />
            </IconWrapper>
            <p>Prague</p>
          </figcaption> */}
        </Photo>
        <Photo>
          <img src={photo1.src} alt="Photo" />
        </Photo>
        <Photo>
          <img src={photo.src} alt="Photo" />
        </Photo>
      </Photos>
    </Container>
  );
};

export default BlockTalkView;
