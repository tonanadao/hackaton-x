import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";
import Link from "next/link";

import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import tony from "../../public/images/tony.jpg";
import nikita from "../../public/images/nikita.jpg";
import sergey from "../../public/images/sergey.jpg";



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

const Judges = styled.article`
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

const JudgesData = [
  {
    name: "Nikita Moskalenko",
    image: {
      url: nikita,
    },
    company: "Hexit Capital",
    position: "Investment Manager",
    linkedin: "https://www.linkedin.com/in/nikmos/",
  },
  {
    name: "Anthony Tsivarev",
    image: {
      url: tony,
    },
    company: "FS Labs",
    position: "Senior Partner",
    linkedin: "https://www.linkedin.com/in/tsivarev/",
  },
  {
    name: "Sergey Chikirev",
    image: {
      url: sergey,
    },
    company: "Tonstarter",
    position: "Engineer",
    linkedin: "",
  },

];

const JudgesView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <Heading01>JUDGES</Heading01>
      </Heading>
      <Judges>
        {JudgesData.map((judge, index) => (
          <Link key={index} href={judge.linkedin} passHref>
            <a rel="noreferrer noopener" target="_blank">
              <figure>
                <img src={judge?.image.url.src} alt="judge" />
                <h2>{judge?.name}</h2>
                <p>
                  {judge?.company} • {judge?.position}
                </p>
              </figure>
            </a>
          </Link>
        ))}
      </Judges>
    </Container>
  );
};

export default JudgesView;
