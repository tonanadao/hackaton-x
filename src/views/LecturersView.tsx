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
import aashima from "../../public/images/aashima_arora.jpeg";
import edwin from "../../public/images/edwin_kapesa.jpeg";
import tony from "../../public/images/tony.jpg";
import roman from "../../public/images/roman.jpg";
import nikita from "../../public/images/nikita.jpg";



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

const Lecturers = styled.article`
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

const LecturersData = [
  {
    name: "Roman Krutovoy",
    image: {
      url: roman,
    },
    company: "TON Community",
    position: "Head of Onboarding / Product Manager",
    linkedin: "https://www.linkedin.com/in/krutovoy/",
  },
  {
    name: "TBA",
    image: {
      url: question,
    },
    company: "TON PLAY",
    position: "TBA",
    linkedin: "",
  },
  {
    name: "Arthur Stambultsyan",
    image: {
      url: question,
    },
    company: "TWA",
    position: "TBA",
    linkedin: "",
  },
];

const LecturersView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <Heading01>Lecturers</Heading01>
      </Heading>
      <Lecturers>
        {LecturersData.map((lecture, index) => (
          <Link key={index} href={lecture.linkedin} passHref>
            <a rel="noreferrer noopener" target="_blank">
              <figure>
                <img src={lecture?.image.url.src} alt="lecturer" />
                <h2>{lecture?.name}</h2>
                <p>
                  {lecture?.company} • {lecture?.position}
                </p>
              </figure>
            </a>
          </Link>
        ))}
      </Lecturers>
    </Container>
  );
};

export default LecturersView;
