import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading03 } from "../../styled/common/heading";
import { XIcon } from "@heroicons/react/solid";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { MediaQuery } from "../../hooks/useDeviceType";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Container = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  color: #000;
`;

const IconWrapper = styled.figure`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);

  svg {
    height: 30px;
    width: 30px;
  }
`;

interface PopupProps {
  closePopup: () => void;
  children: React.ReactNode;
}

const CustomPopup = ({ closePopup, children }: PopupProps) => {
  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          closePopup();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Overlay>
      <Container ref={wrapperRef}>
        <IconWrapper onClick={closePopup}>
          <XIcon />
        </IconWrapper>
        {children}
      </Container>
    </Overlay>
  );
};

export default CustomPopup;
