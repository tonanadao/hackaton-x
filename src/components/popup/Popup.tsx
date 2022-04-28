import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading03 } from "../../styled/common/heading";
import { XIcon } from "@heroicons/react/solid";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

import metamask from "../../../public/images/metamask.svg";
import walletConnect from "../../../public/images/wallet_connect.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Container = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 600px;
  border-radius: 20px;
  padding: 20px;
  color: #000;
`;

const Wallets = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wallet = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  height: 160px;
  cursor: pointer;
  margin-bottom: 10px;

  img {
    height: 80px;
    width: 80px;
    margin-right: 40px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const IconWrapper = styled.figure`
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

const Text = styled.div`
  display: flex;
  flex-direction: column;

  p {
    opacity: 0.6;
  }
`;

interface PopupProps {
  closePopup: () => void;
  setProvider: (provider: ethers.providers.Web3Provider) => void;
}

const Popup = ({ closePopup, setProvider }: PopupProps) => {
  const [localProvider, setLocalProvider] = useState<
    ethers.providers.ExternalProvider | WalletConnectProvider
  >();

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

  async function connectMetamask() {
    if (typeof window !== "undefined") {
      setLocalProvider((window as any).ethereum);
    }

    const ethereum = (window as any).ethereum;

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    if (!ethereum) {
      throw new Error("Metamask extension is not available");
    }

    // ethereum.on("accountsChanged", (accounts: Array<string>) =>
    //   onAccountsChanged(accounts)
    // );
    // ethereum.on(
    //   "chainChanged",
    //   (chainIdHex: string) =>
    //     onChainChange && onChainChange(hexToNumber(chainIdHex))
    // );

    setProvider(new ethers.providers.Web3Provider(ethereum));
  }

  async function connectWalletConnect() {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: {
        97: "https://api-eu1.tatum.io/v3/bsc/web3/8ac074a3-0373-4e80-a904-88fc23f468e5",
        56: "https://bsc-dataseed.binance.org/",
        1: "https://main-light.eth.linkpool.io/",
        4: "https://rinkeby-light.eth.linkpool.io/",
      },
      chainId: Number(process.env.REACT_APP_CHAIN_ID),
    });

    try {
      walletConnectProvider["removeAllListeners"]();
      const accounts = await walletConnectProvider.enable();
    } catch (err) {
      console.log(err);
    }

    //  walletConnectProvider.on("disconnect", onDisconnect);
    //  walletConnectProvider.on("accountsChanged", (accounts: string[]) =>
    //    onAccountsChange(accounts)
    //  );
    //  walletConnectProvider.on("chainChanged", onChainChange);

    function isIOS() {
      return (
        [
          "iPad Simulator",
          "iPhone Simulator",
          "iPod Simulator",
          "iPad",
          "iPhone",
          "iPod",
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      );
    }

    if (walletConnectProvider instanceof WalletConnectProvider) {
      if (
        walletConnectProvider.connector.peerMeta?.url ===
        "https://trustwallet.com"
      ) {
        if (document.body.offsetWidth <= 768 && isIOS()) {
          // @ts-ignore
          window.IS_TRUST_WALLET_MOBILE = true;
        }
      }
    }

    console.log(walletConnectProvider);
    setProvider(new ethers.providers.Web3Provider(walletConnectProvider));
  }

  return (
    <Overlay>
      <Container ref={wrapperRef}>
        <Header>
          <Heading03>Connect wallet</Heading03>
          <IconWrapper onClick={closePopup}>
            <XIcon />
          </IconWrapper>
        </Header>
        <Wallets>
          <Wallet onClick={connectMetamask}>
            <img src={metamask.src} alt="metamask" />
            <Text>
              <Heading03>METAMASK</Heading03>
              <p>Connect using browser wallet</p>
            </Text>
          </Wallet>
          <Wallet onClick={connectWalletConnect}>
            <img src={walletConnect.src} alt="wallet_connect" />
            <Text>
              <Heading03>WALLET CONNECT</Heading03>
              <p>Connect using wallet connect</p>
            </Text>
          </Wallet>
        </Wallets>
      </Container>
    </Overlay>
  );
};

export default Popup;
