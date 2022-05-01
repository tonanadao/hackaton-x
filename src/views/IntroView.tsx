import React, { useState, useEffect } from "react";
import { Heading01 } from "../styled/common/heading";
import { DODGERBLUE } from "../styled/colors";
import styled from "styled-components";
import {
  Button,
  ButtonAppearance,
  ButtonType,
} from "../components/button/Button";
import { MediaQuery } from "../hooks/useDeviceType";
import { Web3Provider } from "../components/layout/Layout";

// import linkedIn from "../../public/images/linkedIn.svg";
// import twitch from "../../public/images/twitch.svg";
// import youtube from "../../public/images/youtube.svg";

const Container = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 140px 0 50px;

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
    padding: 10px 15px;
    margin: 10px;
  }

  @media ${MediaQuery.isMobile} {
    li {
      padding: 10px;
    }
  }

  @media screen and (max-width: 505px) {
    ul {
      flex-direction: column;
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;

  input {
    margin: 0;
    width: auto;
    margin-left: 20px;
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

const IntroView = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [receiveUpdates, setReceiveUpdates] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>("");

  const provider = React.useContext(Web3Provider);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email) {
      const response_get = await fetch(
        process.env.REACT_APP_API_LOCATION +
          "/api/v1/account/register_email/get_register_email_token/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token_response = await response_get.json();

      const msg = `${email};${token_response.token}`;

      const signature = await provider?.getSigner().signMessage(msg);

      const response_post = await fetch(
        process.env.REACT_APP_API_LOCATION + "/api/v1/account/register_email/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token_email: msg,
            signature: signature,
            first_name: firstname,
            last_name: lastname,
            twitter: twitter,
            linkedin: linkedIn,
            pfp_nft_address: "pfp_nft_address",
            pfp_token_id: 0,
          }),
        }
      );

      console.log(await response_post.json());
    }
  }

  async function fetchData() {
    const accounts = await provider?.listAccounts();

    if (accounts) {
      setAccountAddress(accounts[0]);
    }
  }

  function checkboxState(e: any) {
    if (e.target.checked) {
      setReceiveUpdates(true);
    } else {
      setReceiveUpdates(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [provider]);

  return (
    <Container>
      <Content>
        <article>
          <Tags>
            <li style={{ fontSize: "27px", padding: "0" }}>
              12 May 2022 • 15:00 CEST
            </li>
            <ul style={{ display: "flex" }}>
              <li style={{ background: "#0066FF" }}>
                GameFi, Blockchain, DeFi
              </li>
              <li style={{ border: "1px solid white" }}>Language: English</li>
            </ul>
          </Tags>
          <Heading01>
            Learn more about <b style={{ color: `${DODGERBLUE}` }}>GameFi</b>
          </Heading01>
          <Info>
            <li>&gt; hybrid blockchain conference</li>
            <li>&gt; by blockczech r&d lab</li>
          </Info>
          {/* <Button appearance={ButtonAppearance.outline}>File a claim</Button> */}
        </article>
        <SubscribeForm onSubmit={(e) => handleSubmit(e)}>
          <h2>Register yourself!</h2>
          <hr />
          <ModifiedInput>
            <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </ModifiedInput>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          {email ? (
            <Checkbox>
              <p>I want to receive updates</p>
              <input
                type="checkbox"
                checked={receiveUpdates}
                onChange={(e) => checkboxState(e)}
              />
            </Checkbox>
          ) : null}
          <WalletAddress>
            {provider ? <p>{accountAddress}</p> : null}
          </WalletAddress>
          <Button type={ButtonType.submit}>Register now</Button>
        </SubscribeForm>
      </Content>
    </Container>
  );
};

export default IntroView;