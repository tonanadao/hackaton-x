import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { DODGERBLUE } from "../../styled/colors";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { MediaQuery, useDeviceType } from "../../hooks/useDeviceType";

const ButtonContainer = styled.button<{
  appearance: string;
  isMobile: boolean;
}>`
  background-color: ${(props) =>
    props.appearance === "fill" ? DODGERBLUE : "transparent"};
  min-width: 206px;
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

  svg {
    height: 25px;
    width: 25px;
    margin-left: 5px;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.93);
  }
`;

export enum ButtonType {
  submit = "submit",
  button = "button",
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
}

export const Button = ({
  type = ButtonType.button,
  appearance = ButtonAppearance.fill,
  children,
  href,
  onClick,
}: ButtonProps) => {
  const isMobile = useDeviceType(MediaQuery.isMobile);

  if (href) {
    return (
      <Link href={href} passHref>
        <ButtonContainer
          appearance={appearance}
          type={type}
          isMobile={isMobile}
        >
          {children}
          {appearance === "outline" ? <ChevronRightIcon /> : null}
        </ButtonContainer>
      </Link>
    );
  } else if (onClick) {
    return (
      <ButtonContainer appearance={appearance} type={type} onClick={onClick}>
        {children}
        {appearance === "outline" ? <ChevronRightIcon /> : null}
      </ButtonContainer>
    );
  } else {
    return (
      <ButtonContainer appearance={appearance} type={type}>
        {children}
        {appearance === "outline" ? <ChevronRightIcon /> : null}
      </ButtonContainer>
    );
  }
};

export default Button;
