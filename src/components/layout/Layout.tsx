import React from "react";
import styled from "styled-components";
import { BLACKPEARL } from "../../styled/colors";
import { Button } from "../button/Button";
import { MailIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { MediaQuery, useDeviceType } from "../../hooks/useDeviceType";

import logo from "../../../public/images/logo.svg";
import logo_small from "../../../public/images/logo_small.svg";
import background_large from "../../../public/images/background_large.png";
import background_small from "../../../public/images/background_small.png";

const Container = styled.main`
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  height: 100px;
  width: 100%;
  background-color: ${BLACKPEARL};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;

  @media ${MediaQuery.isTablet} {
    padding: 0 60px;
  }

  @media ${MediaQuery.isMobile} {
    padding: 0 60px;
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
    }
  }
`;

const BackgroundWrapper = styled.div<{ isDesktop: boolean }>`
  min-height: 100vh;
  background-image: ${(props) =>
    props.isDesktop
      ? `url(${background_large.src})`
      : `url(${background_small.src})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Footer = styled.footer`
  height: 243px;
  background-color: ${BLACKPEARL};
  display: flex;
  justify-content: center;
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
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  a {
    color: white;
    text-decoration: none;
  }

  div {
    margin: 0 10px;
  }

  @media ${MediaQuery.isMobile} {
    flex-direction: column;
  }
`;

const IconWrapper = styled.figure`
  height: 25px;
  width: 25px;

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
`;

const LogoWrapper = styled.figure`
  height: 68px;
  width: 285px;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useDeviceType(MediaQuery.isDesktop);
  const isMobile = useDeviceType(MediaQuery.isMobile);

  return (
    <Container>
      <Header>
        <Link href="/" passHref>
          <LogoWrapper>
            {isMobile ? (
              <img src={logo_small.src} alt="Logo" />
            ) : (
              <img src={logo.src} alt="Logo" />
            )}
          </LogoWrapper>
        </Link>
        <Navbar>
          {isDesktop ? (
            <ul>
              <li>Home</li>
              <li>Partnerships</li>
            </ul>
          ) : null}
          <Button>Connect Wallet</Button>
          {!isDesktop ? (
            <HamburgerMenu>
              <div></div>
              <div></div>
              <div></div>
            </HamburgerMenu>
          ) : null}
        </Navbar>
      </Header>
      <BackgroundWrapper isDesktop={isDesktop}>{children}</BackgroundWrapper>
      <Footer>
        <FooterContent>
          <Policies>
            <Link href="/privacy-policy" passHref>
              <p>Privacy Policy</p>
            </Link>
            <div>
              <p>|</p>
            </div>
            <Link href="/terms-and-conditions" passHref>
              <p>Terms & Conditions</p>
            </Link>
          </Policies>
          <Info>
            <IconWrapper>
              <MailIcon />
            </IconWrapper>
            <div>
              <p>•</p>
            </div>
            <a href="mailto:blocktalk@blockczech.io">blocktalk@blockczech.io</a>
            <div>
              <p>•</p>
            </div>
            <Link href="https://www.blockczech.io" passHref>
              <a target="_blank">www.blockczech.io</a>
            </Link>
          </Info>
          <p style={{ textAlign: "center" }}>
            © 2022 BlockCzech R&D Lab. All rights reserved
          </p>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Layout;
