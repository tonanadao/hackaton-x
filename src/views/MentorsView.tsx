import React from "react";
import { MediaQuery } from "../hooks/useDeviceType";
import styled from "styled-components";
import { Heading01 } from "../styled/common/heading";
import Link from "next/link";

import vadim from "../../public/images/vadim.jpg";
import square from "../../public/images/blue_square.svg";
import question from "../../public/images/question.jpg";
import tamara from "../../public/images/tamara.jpg";
import eugene from "../../public/images/eugene.jpg";
import vlad from "../../public/images/vlad.jpg";
import dima from "../../public/images/dima.jpg";




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

const Mentors = styled.article`
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

const MentorsData = [
  {
    name: "Eugene Anisei",
    image: {
      url: eugene,
    },
    company: "Tonana",
    position: "COO",
    linkedin: "https://www.linkedin.com/in/eugen-anisei/",
  },

  {
    name: "Tamara Bizyuk",
    image: {
      url: tamara,
    },
    company: "Tatum",
    position: "Customer Acquisition & Retention",
    linkedin: "https://www.linkedin.com/in/tamarabizyuk/",
  },
  {
    name: "Vadim Keffler",
    image: {
      url: vadim,
    },
    company: "T7T Labs",
    position: "CEO",
    linkedin: "https://www.linkedin.com/in/vadimkeffler/",
  },
  {
    name: "Vladislav Blizniuk",
    image: {
      url: vlad,
    },
    company: "Tonana",
    position: "CTO",
    linkedin: "https://www.linkedin.com/in/sepezho/",
  },
  {
    name: "Dima Voloshchuk",
    image: {
      url: dima,
    },
    company: "Stablegram",
    position: "CEO & Founder",
    linkedin: "http://Stablegram.com",
  },
  // {
  //   name: "Alessio Pezzin",
  //   image: {
  //     url: tamara,
  //   },
  //   company: "Tatum",
  //   position: "Customer Acquisition & Retention",
  //   linkedin: "  https://www.linkedin.com/in/alessio-pezzin/",
  // },
];

const MentorsView = () => {
  return (
    <Container>
      <Heading>
        <img src={square.src} alt="Square" />
        <Heading01>MENTORS</Heading01>
      </Heading>
      <Mentors>
        {MentorsData.map((mentor, index) => (
          <Link key={index} href={mentor.linkedin} passHref>
            <a rel="noreferrer noopener" target="_blank">
              <figure>
                <img src={mentor?.image.url.src} alt="mentor" />
                <h2>{mentor?.name}</h2>
                <p>
                  {mentor?.company} • {mentor?.position}
                </p>
              </figure>
            </a>
          </Link>
        ))}
      </Mentors>
    </Container>
  );
};

export default MentorsView;
