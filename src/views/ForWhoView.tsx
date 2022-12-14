import React from "react";
import { HeadingLogo } from "../styled/common/heading";
import styled from "styled-components";
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

const Webinar = styled.section`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 120px;

  article {
    background: #0c0c53;
    padding: 30px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    /* h2 {
      margin-bottom: 20px;
    } */
  }

  @media ${MediaQuery.isTablet} {
    grid-template-columns: 1fr;
  }

  @media ${MediaQuery.isMobile} {
    grid-template-columns: 1fr;
  }
`;

const ForWhoView = () => {
  return (
    <Container>
      <HeadingLogo style={{ textAlign: "center" }}>
        Who is the event for?
      </HeadingLogo>
      <Webinar>
        <article>
          <h2>Developers</h2>
          {/* <p>
            Upgrade your leadership skills and take your career to a new high
            level
          </p> */}
        </article>
        <article>
          <h2>Blockchain Enthusiasts</h2>
          {/* <p>
            Master the skills of accumulated experience and increase the
            professional level
          </p> */}
        </article>
        <article>
          <h2>VCs & Incubators</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Students</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Engineers</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Business devs</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Designers</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Artists</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
        <article>
          <h2>Cyberpunks</h2>
          {/* <p>
            Attract customers and make useful connections with like-minded
            people
          </p> */}
        </article>
      </Webinar>
    </Container>
  );
};

export default ForWhoView;
