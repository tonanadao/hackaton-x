import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";

import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import arthur from "../../public/images/arthur_sychov.jpeg";
import bozena from "../../public/images/bozena_rezab.jpeg";

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

  figure {
    background: #0c0c53;
    padding: 20px;
    border-radius: 30px;
    width: 280px;
    margin: 20px;

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: center;
      border-radius: 18px;
    }

    h2 {
      margin-bottom: 20px;
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
    name: "Artur Sychov",
    image: {
      url: arthur,
    },
    company: "SomniumSpace",
    position: "Founder & CEO",
  },
  {
    name: "Bozena Rezab",
    image: {
      url: bozena,
    },
    company: "GAMEE",
    position: "CEO & Co-founder",
  },
  {
    name: "Speaker 3",
    image: {
      url: question,
    },
    company: "TBA",
    position: "TBA",
  },
  {
    name: "Speaker 4",
    image: {
      url: question,
    },
    company: "TBA",
    position: "TBA",
  },
  {
    name: "Speaker 5",
    image: {
      url: question,
    },
    company: "TBA",
    position: "TBA",
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
          <figure key={index}>
            <img src={speaker?.image.url.src} alt="Speaker" />
            <h2>{speaker?.name}</h2>
            <p>
              {speaker?.company} • {speaker?.position}
            </p>
          </figure>
        ))}
      </Speakers>
    </Container>
  );
};

export default SpeakersView;
