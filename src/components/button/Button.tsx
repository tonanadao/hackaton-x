import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { DODGERBLUE } from "../../styled/colors";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { MediaQuery, useDeviceType } from "../../hooks/useDeviceType";

interface ButtonProps {
  appearance?: ButtonAppearance;
  isMobile?: boolean;
}

const ButtonContainer = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.appearance === "fill" ? `${DODGERBLUE}` : `transparent`};
  min-width: ${(props) => (props.isMobile ? "164px" : "206px")};
  height: ${(props) => (props.isMobile ? "44px" : "56px")};
  font-size: 18px;
  font-weight: 700;
  border: ${(props) =>
    props.appearance === "fill" ? "none" : "2px solid white"};
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Sans", sans-serif;
  margin-left: 1px;


  svg {
    height: 25px;
    width: 25px;
    margin-left: 4px;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.93);
  }
`;

const ALink = styled.a`
  text-decoration: none;
`;

export enum ButtonType {
  submit = "submit",
  button = "button",
  undefined = "undefined",
  reset = "reset",
}

export enum ButtonAppearance {
  fill = "fill",
  outline = "outline",
}

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  appearance?: ButtonAppearance;
  href?: string;
  onClick?: () => void;
  style?: any;
}

export const Button = ({
  type = ButtonType.button,
  appearance = ButtonAppearance.fill,
  children,
  href,
  onClick,
  style,
}: ButtonProps) => {
  const isMobile = useDeviceType(MediaQuery.isMobile);

  if (href) {
    return (
      <Link href={href} passHref>
        <ALink target="_blank" rel="noopener noreferrer">
          <ButtonContainer
            //@ts-ignore
            type={type}
            appearance={appearance}
            isMobile={isMobile}
            style={style}
          >
            {children}
            {appearance === "outline" ? <ChevronRightIcon /> : null}
          </ButtonContainer>
        </ALink>
      </Link>
    );
  } else if (onClick) {
    return (
      <ButtonContainer
        appearance={appearance}
        //@ts-ignore
        type={type}
        onClick={onClick}
        style={style}
      >
        {children}
        {appearance === "outline" ? <ChevronRightIcon /> : null}
      </ButtonContainer>
    );
  } else {
    return (
      //@ts-ignore
      <ButtonContainer appearance={appearance} type={type} style={style}>
        {children}
        {appearance === "outline" ? <ChevronRightIcon /> : null}
      </ButtonContainer>
    );
  }
};

export default Button;
