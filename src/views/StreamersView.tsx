import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";
import Link from "next/link";
import { DODGERBLUE } from "../styled/colors";
import youtube from "../../public/images/youtube2.svg";
import linkedIn from "../../public/images/linkedIn2.svg";
import doodle from "../../public/images/doodle.svg";
import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import tony from "../../public/images/tony.jpg";
import nikita from "../../public/images/nikita.jpg";
import sergey from "../../public/images/sergey.jpg";
import telegram from "../../public/images/telegram.png";


const Container = styled.section`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${MediaQuery.isTablet} {
    padding: 20px 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 20px;
  }
`;

const Streamers = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;

  a {
    color: white;
    text-decoration: none;
  }

  figure {
    background: #0c0c53;
    padding: 20px;
    border-radius: 30px;
    width: 280px;
    min-height: 200px;
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

const Broadcast = styled.article`
  h1 {
    margin-bottom: 20px;
  }

  p {
    color: #5a5a86;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: center;

  a {
    border: 1px solid white;
    text-decoration: none;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    &:hover {
      background-color: ${DODGERBLUE.toString()};
    }
  }

  img {
    margin-right: 10px;
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

const StreamersData = [
  {
    name: "26 Sept, 17:00 UTC",
    company: "Roman Krutovoy",
    position: "Head of onboarding on TON",
    linkedin: "https://www.linkedin.com/in/krutovoy/",
    topic: "What is TON and why build on it?",
  },
  {
    name: "27 Sept, 17:00 UTC ",
    company: "Daria Novikova",
    position: "CPO TON Play",
    linkedin: "https://tonplay.io/",
    topic: "Web3 Gaming: new mechanics & game rules",
  },
  {
    name: "28 Sept, 17:00 UTC",
    company: "Arthur Stambultsyan",
    position: "Front-end dev at @wallet",
    linkedin: "https://t.me/wallet",
    topic: "Telegram Web Apps: tips and hacks",
  },
  {
    name: "29 Sept, 13:00 UTC",
    company: "Shahar Yakir",
    position: "jetton.live creator at Orbs",
    linkedin: "https://jetton.live/",
    topic: "Jumpstart at TON ecosystem: dive to TWAs",
  },
];

const StreamersView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <h1>
        Watch pre-hackaTON {"lectures "}
          exclusively on Telegram
        </h1>
      </Heading>
      <Streamers>
        {StreamersData.map((stream, index) => (
          <Link key={index} href={stream.linkedin} passHref>
            <a rel="noreferrer noopener" target="_blank">
              <figure>
                <h2>{stream?.name}</h2>
                <br></br>
                <p>
                  {stream?.company} • <br></br> {stream?.position}
                </p>
                <br></br>
                <p>
                  {stream?.topic}
                </p>
              </figure>
            </a>
          </Link>
        ))}
      </Streamers>
      <Buttons>
          <a
            href="https://t.me/hackaton2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={telegram.src} alt="Telegram" />
            View on Telegram
          </a>
        </Buttons>
    </Container>
  );
};

export default StreamersView;
