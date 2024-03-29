import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";
import Link from "next/link";
import roman from "../../public/images/roman.jpg";
import artur from "../../public/images/artur.jpg";
import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import vova from "../../public/images/vova.png";
import oleg from "../../public/images/oleglarionov.jpg";
import max from "../../public/images/max.jpg";


const Container = styled.section`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${MediaQuery.isTablet} {
    padding: 20px 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px;
  }
`;

const Speakers = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 120px;

  a {
    color: white;
    text-decoration: none;
  }

  figure {
    background: #0c0c53;
    padding: 20px;
    border-radius: 30px;
    width: 280px;
    min-height: 400px;
    margin: 20px;
    cursor: pointer;

    p {
      font-size: 17px;
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: center;
      border-radius: 18px;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 24px;
    }
  }

  @media ${MediaQuery.isTablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }

  @media ${MediaQuery.isMobile} {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  img {
    height: 44px;
    width: 44px;
    margin: 0 20px;
  }

  @media ${MediaQuery.isMobile} {
    img {
      height: 30px;
      width: 30px;
    }
  }
`;

const SpeakersData = [
  {
    name: "Vova Manoilo",
    image: {
      url: vova,
    },
    company: "Wargaming",
    position: "Marketing Manager",
    linkedin: "https://www.linkedin.com/in/manoilo/",
  },

  {
    name: "Oleg Illarionov",
    image: {
      url: oleg,
    },
    company: "StickerFace",
    position: "Developer и Product manager",
    linkedin: "https://illarionov.tech/",
  },
  // {
  //   name: "Ricardo Biosas",
  //   image: {
  //     url: question,
  //   },
  //   company: "TBA",
  //   position: "TBA",
  //   linkedin: "",
  // },
  {
    name: "Roman Krutovoy",
    image: {
      url: roman,
    },
    company: "TON Community",
    position: "Head of Onboarding / Product Manager",
    linkedin: "https://www.linkedin.com/in/krutovoy/",
  },
  // {
  //   name: "TBA",
  //   image: {
  //     url: question,
  //   },
  //   company: "GetGems",
  //   position: "TBA",
  //   linkedin: "",
  // },
  {
    name: "Arthur Stambultsyan",
    image: {
      url: artur,
    },
    company: "@wallet",
    position: "Front-end Developer",
    linkedin: "https://t.me/wallet",
  },

];

const SpeakersView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <Heading01>SPEAKERS</Heading01>
      </Heading>
      <Speakers>
        {SpeakersData.map((speaker, index) => (
          <Link key={index} href={speaker.linkedin} passHref>
            <a rel="noreferrer noopener" target="_blank">
              <figure>
                <img src={speaker?.image.url.src} alt="Speaker" />
                <h2>{speaker?.name}</h2>
                <p>
                  {speaker?.company} • {speaker?.position}
                </p>
              </figure>
            </a>
          </Link>
        ))}
      </Speakers>
    </Container>
  );
};

export default SpeakersView;
