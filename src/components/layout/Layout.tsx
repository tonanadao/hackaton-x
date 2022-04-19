import React from "react";
import styled from "styled-components";
import { BLACKPEARL } from "../../styled/colors";
import { Button } from "../button/Button";
import { MailIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { MediaQuery, useDeviceType } from "../../hooks/useDeviceType";

import logo from "../../../public/images/blocktalk_logo.svg";
import logo_small from "../../../public/images/blue_square.svg";
import background_large from "../../../public/images/background_large.png";
import background_small from "../../../public/images/background_small.png";

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
  padding: 0 20px;

  @media ${MediaQuery.isMobile} {
    background-position: 0%;
    padding: 0;
  }
`;

const Footer = styled.footer`
  height: 243px;
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
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  a {
    color: white;
    text-decoration: none;
  }

  div {
    display: flex;

    p {
      margin: 0 10px;
    }
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

  @media ${MediaQuery.isMobile} {
    margin-left: 20px;
  }
`;

const Thin = styled.span`
  font-weight: 100;
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

export const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useDeviceType(MediaQuery.isDesktop);
  const isMobile = useDeviceType(MediaQuery.isMobile);

  return (
    <Container>
      <Header>
        <Link href="/" passHref>
          <Logo>
            {/* {!isMobile ? ( */}
            <LogoWrapper>
              <img src={logo.src} alt="Logo" />
            </LogoWrapper>
            {/* ) : (
              <LogoWrapperSmall>
                <img src={logo_small.src} alt="Logo" />
              </LogoWrapperSmall>
            )} */}
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
            </ul>
          ) : null}
          {/* <Button>Connect Wallet</Button> */}
          {/* {!isDesktop ? (
            <HamburgerMenu>
              <div></div>
              <div></div>
              <div></div>
            </HamburgerMenu>
          ) : null} */}
        </Navbar>
      </Header>
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
          <Info>
            {!isMobile ? (
              <IconWrapper>
                <MailIcon />
              </IconWrapper>
            ) : null}
            <div>
              <p>•</p>
              <a href="mailto:blocktalk@blockczech.io">
                blocktalk@blockczech.io
              </a>
            </div>
            <div>
              <p>•</p>
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
  );
};

export default Layout;
