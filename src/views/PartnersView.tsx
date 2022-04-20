import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PARTNERS } from "../styled/constants";
import ReactPlayer from "react-player/youtube";
import { MediaQuery } from "../hooks/useDeviceType";

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
    /* height: 40px; */
    height: 80px;
    margin: 10px 20px;
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
          <img src={partner.url} alt={partner.alt} key={index} />
        ))}
      </Partners>
    </Container>
  );
};

export default PartnersView;
