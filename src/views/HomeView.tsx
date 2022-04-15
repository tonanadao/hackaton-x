import React, { useState } from "react";
import { Heading01 } from "../styled/common/heading";
import { DODGERBLUE } from "../styled/colors";
import styled from "styled-components";
import {
  Button,
  ButtonAppearance,
  ButtonType,
} from "../components/button/Button";
import { MediaQuery } from "../hooks/useDeviceType";

import linkedIn from "../../public/images/linkedIn.svg";
import twitch from "../../public/images/twitch.svg";
import youtube from "../../public/images/youtube.svg";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 0;

  @media ${MediaQuery.isTablet} {
    padding: 40px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 40px 20px;
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${MediaQuery.isTablet} {
    grid-template-columns: 1fr;
    grid-gap: 4rem;
  }

  @media ${MediaQuery.isMobile} {
    grid-template-columns: 1fr;
    grid-gap: 4rem;
  }
`;

const Tags = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
  flex-wrap: wrap;
  font-size: 13px;
  margin-bottom: 40px;

  li {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
    margin: 5px;
  }

  @media ${MediaQuery.isMobile} {
    li {
      padding: 10px;
    }
  }
`;

const Info = styled.ul`
  list-style-type: none;
  color: #15c9e9;
  font-family: "DM Mono", monospace;
  margin: 30px 0 40px;
`;

const SubscribeForm = styled.form`
  background-color: white;
  color: black;
  width: 490px;
  margin: 0 auto;
  line-height: 38px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 50px;

  h2 {
    margin-bottom: 20px;
    font-family: "DM Sans", sans-serif;
    font-weight: 700;
    font-size: 30px;
  }

  hr {
    border: 1px solid #d7dedd;
    margin-bottom: 5px;
  }

  input {
    margin: 5px 0;
    font-size: 18px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d7dedd;
    width: 100%;
  }

  @media ${MediaQuery.isMobile} {
    width: 320px;
    padding: 40px 20px;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 60px;

  img {
    margin: 0 10px;
    cursor: pointer;
  }
`;

const Checkbox = styled.div`
  display: flex;

  label {
    display: block;
  }
`;

const ModifiedInput = styled.div`
  display: flex;

  input:first-child {
    margin-right: 5px;
  }
`;

const WalletAddress = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const HomeView = () => {
  const [email, setEmail] = useState<string>();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Container>
      <Content>
        <article>
          <Tags>
            <li style={{ background: "#0066FF" }}>GameFi, Blockchain, DeFi</li>
            <li style={{ background: "#0BBB07" }}>Date: 12. 05. 2022</li>
            <li style={{ background: "#282828" }}>Language: English</li>
          </Tags>
          <Heading01>
            Learn more about <b style={{ color: `${DODGERBLUE}` }}>GameFi</b>
          </Heading01>
          <Info>
            <li>&gt; hybrid blockchain conference</li>
            <li>&gt; by blockczech r&d lab</li>
            <li>&gt; blocktalk.cz</li>
          </Info>
          <Button appearance={ButtonAppearance.outline}>File a claim</Button>
        </article>
        {/* <SubscribeForm onSubmit={(e) => handleSubmit(e)}>
          <h2>Register yourself!</h2>
          <hr />
          <ModifiedInput>
            <input type="text" placeholder="Firstname" />
            <input type="text" placeholder="Lastname" />
          </ModifiedInput>
          <input type="email" placeholder="Email" />
          <ModifiedInput>
            <input type="text" placeholder="Company" />
            <input type="text" placeholder="Position" />
          </ModifiedInput>
          <input type="text" placeholder="Interest" />
          {email ? (
            <Checkbox>
              <label htmlFor="update">I want to receive updates</label>
              <input type="checkbox" />
            </Checkbox>
          ) : null}
          <WalletAddress>
            <p>0x1dank33kdds565m4o3kngfk21</p>
          </WalletAddress>
          <Button type={ButtonType.submit}>Register now</Button>
          <Socials>
            <img src={linkedIn.src} alt="LinkedIn" />
            <img src={youtube.src} alt="Youtube" />
            <img src={twitch.src} alt="Twitch" />
          </Socials>
        </SubscribeForm> */}
      </Content>
    </Container>
  );
};

export default HomeView;
