import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";
import Link from "next/link";

import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import francesco from "../../public/images/francesco_vincenti.jpeg";
import bozena from "../../public/images/bozena_rezab.jpeg";
import yavin from "../../public/images/on_yavin.jpeg";
import olumide from "../../public/images/olumide_gbendro.jpeg";
import chris from "../../public/images/chris_curra.jpeg";
import simon from "../../public/images/simon_mikolajczyk.jpeg";

const Container = styled.section`
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
    name: "Francesco Vincenti",
    image: {
      url: francesco,
    },
    company: "SomniumSpace",
    position: "Business Development",
    linkedin: "https://www.linkedin.com/in/francesco--vincenti/",
  },
  {
    name: "Christophe  Curra",
    image: {
      url: chris,
    },
    company: "Defungify",
    position: "Founder",
    linkedin: "https://www.linkedin.com/in/chrisjcurra",
  },
  {
    name: "On Yavin",
    image: {
      url: yavin,
    },
    company: "Cointelligence.fund",
    position: "Managing Partner",
    linkedin: "https://www.linkedin.com/in/onyavin/",
  },
  {
    name: "Olúmidé Gbenro",
    image: {
      url: olumide,
    },
    company: "Non Fungible Fest",
    position: "NFT Advisor",
    linkedin: "https://www.linkedin.com/in/olumidegbenro/",
  },
  {
    name: "Simon Mikolajczyk",
    image: {
      url: simon,
    },
    company: "Metaverse Fashion Council",
    position: "Founder MaisonDAO",
    linkedin: "https://www.linkedin.com/in/simonmikolajczyk/",
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
