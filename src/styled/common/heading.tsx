import styled from "styled-components";
import { MediaQuery } from "../../hooks/useDeviceType";

export const Heading01 = styled.h1`
  font-size: 88px;
  font-style: normal;
  font-weight: 700;
  line-height: 100px;
  font-family: "DM Sans", sans-serif;

  @media ${MediaQuery.isMobile} {
    font-size: 40px;
    line-height: 40px;
  }
`;

export const HeadingLogo = styled.h1`
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  font-family: "DM Sans", sans-serif;
`;
