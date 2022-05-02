import React, { useState, createContext, useEffect } from "react";
import styled from "styled-components";
import { BLACKPEARL, DODGERBLUE } from "../../styled/colors";
import { Button } from "../button/Button";
import {
  MailIcon,
  PhoneIcon,
  GlobeAltIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { MediaQuery, useDeviceType } from "../../hooks/useDeviceType";
import Popup from "../popup/Popup";

import logo from "../../../public/images/blocktalk_logo.svg";
import logo_small from "../../../public/images/blue_square.svg";
import background_large from "../../../public/images/background_large.png";
import background_small from "../../../public/images/background_small.png";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { _fetchData } from "ethers/lib/utils";

const Container = styled.main`
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  height: 100px;
  width: 100%;
  background-color: ${BLACKPEARL.toString()};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;

  @media ${MediaQuery.isTablet} {
    padding: 0 60px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 0 20px;
  }
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;

  ul {
    display: flex;
    align-items: center;
    list-style-type: none;

    li {
      margin: 0 20px;
      cursor: pointer;
    }
  }
`;

const BackgroundWrapper = styled.div<{ isMobile: boolean }>`
  min-height: 100vh;
  background-image: ${(props) =>
    !props.isMobile
      ? `url(${background_large.src})`
      : `url(${background_small.src})`};
  background-repeat: no-repeat;
  background-position: 50% 0%;
  background-size: cover;

  @media (max-width: 1500px) {
    padding: 0 60px;
  }

  @media ${MediaQuery.isMobile} {
    background-position: 0%;
    padding: 0;
  }
`;

const Footer = styled.footer`
  height: 280px;
  background-color: ${BLACKPEARL.toString()};
  display: flex;
  justify-content: center;

  @media ${MediaQuery.isMobile} {
    font-size: 14px;
  }
`;

const FooterContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Policies = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  div {
    margin: 0 10px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  a {
    color: white;
    text-decoration: none;
  }

  div {
    display: flex;
    margin: 10px 0;
  }

  @media ${MediaQuery.isMobile} {
    padding: 0 40px;
    align-items: flex-start;
  }
`;

const IconWrapper = styled.figure`
  height: 25px;
  width: 25px;
  margin-right: 20px;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 35px;
  margin-left: 40px;
  cursor: pointer;

  div {
    background-color: white;
    border-radius: 1px;
    height: 4px;
    width: 100%;
  }

  @media ${MediaQuery.isMobile} {
    margin-left: 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.figure`
  height: 70px;
  width: 252px;
  cursor: pointer;
  margin-right: 20px;

  img {
    height: 100%;
    width: 100%;
  }
`;

const LogoWrapperSmall = styled.figure`
  height: 50px;
  width: 50px;
  cursor: pointer;
  margin-right: 20px;

  img {
    height: 100%;
    width: 100%;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Web3Provider = createContext<ethers.providers.Web3Provider | null>(
  null
);

export const OpenPopup = createContext<any>({
  setShowPopup: () => {},
});

export const Layout = ({ children }: LayoutProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [accountAddress, setAccountAdress] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const isDesktop = useDeviceType(MediaQuery.isDesktop);
  const isMobile = useDeviceType(MediaQuery.isMobile);

  function disconnect() {
    const receivedObject = localStorage.getItem("walletconnect");

    if (receivedObject) {
      (provider?.provider as WalletConnectProvider).disconnect();
    }

    localStorage.setItem("isConnected", "false");

    setProvider(null);
  }

  async function fetchData() {
    const isConnected = localStorage.getItem("isConnected");

    let web3: ethers.providers.Web3Provider;

    if (isConnected && isConnected === "true") {
      const isWalletConnect = localStorage.getItem("walletconnect");

      if (isWalletConnect) {
        const provider = new WalletConnectProvider({
          rpc: {
            97: "https://api-eu1.tatum.io/v3/bsc/web3/8ac074a3-0373-4e80-a904-88fc23f468e5",
            56: "https://bsc-dataseed.binance.org/",
            1: "https://main-light.eth.linkpool.io/",
            4: "https://rinkeby-light.eth.linkpool.io/",
          },
          chainId: Number(process.env.REACT_APP_CHAIN_ID),
        });

        provider.enable();

        web3 = new ethers.providers.Web3Provider(provider);
      } else {
        const ethereum = (window as any).ethereum;

        web3 = new ethers.providers.Web3Provider(ethereum);
      }

      const accounts = await web3.listAccounts();

      setAccountAdress(accounts[0]);

      setProvider(web3);
    }
  }

  async function getAccountAddress() {
    const accounts = await provider?.listAccounts();

    if (accounts) {
      setAccountAdress(accounts[0]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getAccountAddress();
  }, [provider]);

  return (
    <Web3Provider.Provider value={provider}>
      <OpenPopup.Provider value={() => setShowPopup(true)}>
        <Container>
          <Header>
            <Link href="/" passHref>
              <Logo>
                {!isMobile ? (
                  <LogoWrapper>
                    <img src={logo.src} alt="Logo" />
                  </LogoWrapper>
                ) : (
                  <LogoWrapperSmall>
                    <img src={logo_small.src} alt="Logo" />
                  </LogoWrapperSmall>
                )}
              </Logo>
            </Link>
            <Navbar>
              {isDesktop ? (
                <ul>
                  <Link href="/" passHref>
                    <li>Home</li>
                  </Link>
                  <Link href="/#partners" passHref>
                    <li>Partners</li>
                  </Link>
                  <Link href="/#contact" passHref>
                    <li>Contact</li>
                  </Link>
                </ul>
              ) : null}
              {provider ? (
                <Button
                  onClick={disconnect}
                  style={{
                    backgroundColor: `${DODGERBLUE.toString()}`,
                    color: "#fff",
                    border: "1px solid #fff",
                  }}
                >
                  {accountAddress.substring(0, 5).concat("...") +
                    accountAddress.substring(accountAddress.length - 4)}
                </Button>
              ) : (
                <Button onClick={() => setShowPopup(true)}>
                  Connect Wallet
                </Button>
              )}
              {/* {!isDesktop ? (
            <HamburgerMenu>
              <div></div>
              <div></div>
              <div></div>
            </HamburgerMenu>
          ) : null} */}
            </Navbar>
          </Header>
          {showPopup ? (
            <Popup
              closePopup={() => setShowPopup(false)}
              setProvider={setProvider}
            />
          ) : null}
          <BackgroundWrapper isMobile={isMobile}>{children}</BackgroundWrapper>
          <Footer>
            <FooterContent>
              {/* <Policies>
            <Link href="/privacy-policy" passHref>
              <p>Privacy Policy</p>
            </Link>
            <div>
              <p>|</p>
            </div>
            <Link href="/terms-and-conditions" passHref>
              <p>Terms & Conditions</p>
            </Link>
          </Policies> */}
              <Info id="contact">
                <div>
                  <IconWrapper>
                    <LocationMarkerIcon />
                  </IconWrapper>
                  <p>
                    Paralelní Polis, Dělnická 475/43, Holešovice, 170 00 Praha 7
                  </p>
                </div>
                <div>
                  <IconWrapper>
                    <MailIcon />
                  </IconWrapper>
                  <a href="mailto:blocktalk@blockczech.io">
                    blocktalk@blockczech.io
                  </a>
                </div>
                <div>
                  <IconWrapper>
                    <PhoneIcon />
                  </IconWrapper>
                  <a href="tel:+420773008994">+420 773 008 994</a>
                </div>
                <div>
                  <IconWrapper>
                    <GlobeAltIcon />
                  </IconWrapper>
                  <Link href="https://www.blockczech.io" passHref>
                    <a target="_blank">www.blockczech.io</a>
                  </Link>
                </div>
              </Info>
              <p style={{ textAlign: "center" }}>
                © 2022 BlockCzech R&D Lab. All rights reserved
              </p>
            </FooterContent>
          </Footer>
        </Container>
      </OpenPopup.Provider>
    </Web3Provider.Provider>
  );
};

export default Layout;
