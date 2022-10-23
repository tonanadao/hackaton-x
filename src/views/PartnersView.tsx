import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PARTNERS } from "../styled/constants";
import ReactPlayer from "react-player/youtube";
import { MediaQuery } from "../hooks/useDeviceType";
import Link from "next/link";

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

const Partners = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;

  img {
    // width: 300px;
    height: 80px;
    margin: 10px 20px;
    cursor: pointer;
  }

  @media ${MediaQuery.isTablet} {
    justify-content: center;
    margin-bottom: 60px;

    img {
      margin: 20px;
    }
  }

  @media ${MediaQuery.isMobile} {
    justify-content: center;
    margin-bottom: 60px;

    img {
      height: 30px;
      margin: 20px;
    }
  }
`;

const PartnersView = () => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <Container>
      <Partners id="partners">
        {PARTNERS.map((partner, index) => (
          <Link href={partner.url} key={index} passHref>
            <a rel="noopner noreferrer" target="_blank">
              <img src={partner.img} alt={partner.alt} />
            </a>
          </Link>
        ))}
      </Partners>
    </Container>
  );
};

export default PartnersView;
