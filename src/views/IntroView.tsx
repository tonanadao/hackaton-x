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
import { Web3Provider, OpenPopup } from "../components/layout/Layout";
import CustomPopup from "../components/popup/CustomPopup";
import {
  CheckIcon,
  XIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import QRCode from "react-qr-code";
import { ethers } from "ethers";

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

const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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

const ModifiedInput = styled.div`
  display: flex;

  input:first-child {
    margin-right: 5px;
  }
`;

const WalletAddress = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #d7dedd;
  margin: 5px 0 20px;

  input {
    width: 60%;
    border: none;
    margin: 0;
  }
`;

const WalletStatus = styled.div`
  width: 30%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Status = styled.div<{ connected: boolean }>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.connected ? "#00c749" : DODGERBLUE.toString()};
  color: #fff;
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-right: 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: ${(props) => props.connected === false && "pointer"};
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormIconWrapper = styled.figure`
  width: 26px;
  height: 26px;
  cursor: pointer;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const IconWrapper = styled.figure<{ color: string }>`
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 100%;
  margin-bottom: 40px;

  svg {
    height: 100px;
    width: 100px;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 30px;
    max-width: 80%;
  }
`;

const SmallText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const PopupInfo = styled.article`
  height: 500px;
  width: 100%;
  overflow-y: auto;
  white-space: pre-wrap; /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
`;

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "firstName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "lastName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "twitter",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "linkedin",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pfpNFTaddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pfpTokenId",
        type: "uint256",
      },
    ],
    name: "ProfileMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "firstName", type: "string" },
          { internalType: "string", name: "lastName", type: "string" },
          { internalType: "string", name: "twitter", type: "string" },
          { internalType: "string", name: "linkedin", type: "string" },
          { internalType: "address", name: "pfpNFTaddress", type: "address" },
          { internalType: "uint256", name: "pfpTokenId", type: "uint256" },
        ],
        internalType: "struct BlockTalkProfileV1.ProfileData",
        name: "_profileData",
        type: "tuple",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      {
        components: [
          { internalType: "string", name: "firstName", type: "string" },
          { internalType: "string", name: "lastName", type: "string" },
          { internalType: "string", name: "twitter", type: "string" },
          { internalType: "string", name: "linkedin", type: "string" },
          { internalType: "address", name: "pfpNFTaddress", type: "address" },
          { internalType: "uint256", name: "pfpTokenId", type: "uint256" },
        ],
        internalType: "struct BlockTalkProfileV1.ProfileData",
        name: "_profileData",
        type: "tuple",
      },
    ],
    name: "createProfileCustodial",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getImplementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "profileCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const IntroView = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);

  const contractAddress = "0xED840aC715e7bd6B986C58bd84F1dbE4A3350E07";

  const provider = React.useContext(Web3Provider);

  const showPopup = React.useContext(OpenPopup);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email && provider.provider) {
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

      const signature = await provider.provider?.getSigner().signMessage(msg);

      let responseBody: any = {
        token_email: msg,
        signature: signature,
        first_name: firstname,
        last_name: lastname,
        pfp_nft_address: ethers.constants.AddressZero,
        pfp_token_id: 0,
      };

      if (linkedIn && twitter) {
        responseBody.linkedIn = linkedIn;
        responseBody.twitter = twitter;
      } else if (linkedIn) {
        responseBody.linkedIn = linkedIn;
      } else if (twitter) {
        responseBody.twitter = twitter;
      }

      const response_post = await fetch(
        process.env.REACT_APP_API_LOCATION + "/api/v1/account/register_email/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseBody),
        }
      );

      console.log(await response_post.json());

      if (response_post.ok) {
        setShowSuccess(true);
        setShowQR(true);
      } else {
        setShowError(true);
      }
    } else if (email) {
      showPopup();
    } else {
      if (provider.provider) {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          provider.provider.getSigner()
        );

        let networkId = (await provider.provider.getNetwork()).chainId;

        if (networkId !== Number(process.env.REACT_APP_POLYGON_CHAIN_ID)) {
          try {
            //@ts-ignore
            provider.provider.provider.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: decToHex(
                    Number(process.env.REACT_APP_POLYGON_CHAIN_ID)
                  ),
                },
              ],
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          const tx = await contract.functions.createProfile([
            firstname,
            lastname,
            twitter,
            linkedIn,
            ethers.constants.AddressZero,
            0,
          ]);

          await tx.wait();
        }
      }
    }
  }

  function hexToDec(hexString: string) {
    return parseInt(hexString, 16);
  }

  const decToHex = (val: number): string => `0x${val.toString(16)}`;

  async function fetchData() {
    const accounts = await provider.provider?.listAccounts();

    if (provider.provider && accounts) {
      if (accounts.length > 0) {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          provider.provider.getSigner()
        );

        let networkId = (await provider.provider.getNetwork()).chainId;

        if (networkId !== Number(process.env.REACT_APP_POLYGON_CHAIN_ID)) {
          //@ts-ignore
          provider.provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: decToHex(
                  Number(process.env.REACT_APP_POLYGON_CHAIN_ID)
                ),
              },
            ],
          });

          networkId = (await provider.provider.getNetwork()).chainId;

          if (networkId === Number(process.env.REACT_APP_POLYGON_CHAIN_ID)) {
            const balance = await contract.functions.balanceOf(accounts[0]);

            if (hexToDec(balance[0]._hex) > 0) {
              setShowQR(true);
            }
          }
        } else {
          if (accountAddress) {
            const balance = await contract.functions.balanceOf(accountAddress);

            if (hexToDec(balance[0]._hex) > 0) {
              setShowQR(true);
            }
          }
        }
      }
    }

    if (!provider.provider) {
      setAccountAddress("");
    }

    if (accounts) {
      setAccountAddress(accounts[0]);
    }
  }

  useEffect(() => {
    fetchData();
  }, [provider]);

  return (
    <Container>
      <Content>
        {showInfo ? (
          <CustomPopup closePopup={() => setShowInfo(false)}>
            <PopupContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <h1>What is this registration about?</h1>
              </div>
              <PopupInfo>
                <p>
                  In BlockCzech we came up with an idea, of how we could use
                  blockchain technology in various kinds of events. Our
                  proof-of-concept project called the BlockTalk platform uses
                  smart contracts to keep track of the people who are attending
                  the event. Let&apos;s start with the first step. You can
                  create your BlockTalk Profile right now through our
                  application or directly in the smart contract{" "}
                  <a
                    href="https://polygonscan.com/address/0xED840aC715e7bd6B986C58bd84F1dbE4A3350E07"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://polygonscan.com/address/0xED840aC715e7bd6B986C58bd84F1dbE4A3350E07
                  </a>
                  . BlockTalk Profile is a soulbound ERC721 NFT that represents
                  your registration in the BlockTalk platform. There are no
                  required fields, but feel free to provide data such as
                  Linkedin or Twitter accounts. Which can then be used for
                  better networking among others attendees. We do not store this
                  data directly on-chain, but we keep them indexed in thegraph
                  through solidity events. After you have successfully created
                  your Profile, let&apos;s dive into step two. The Event. Every
                  event is represented as an ERC1155. So we can give POAPs to
                  attendees when they show up for an event. You will get POAP
                  based on the type of your attendance such as
                  &quot;attendee&quot;, &quot;speaker&quot;, or
                  &quot;partner&quot;. This POAP is also soul-bound so you
                  cannot transfer it. Some tech details. For Profile ERC721
                  we&apos;ve used the openzeppelin UUPS Proxy implementation. As
                  we want to be flexible, with further ideas which can be
                  implemented upon the ERC721 standard. Event is behind
                  gnosis-safe clones proxy, so we (or you) can cheaply create
                  new events. everything is running on the polygon but in the
                  future, we might implement additional L2s.
                </p>
              </PopupInfo>
            </PopupContent>
          </CustomPopup>
        ) : null}
        {showSuccess ? (
          <CustomPopup closePopup={() => setShowSuccess(false)}>
            <PopupContent>
              <IconWrapper color="#00c749">
                <CheckIcon />
              </IconWrapper>
              <p>Registration was successful!</p>
            </PopupContent>
          </CustomPopup>
        ) : null}
        {showError ? (
          <CustomPopup closePopup={() => setShowError(false)}>
            <PopupContent>
              <IconWrapper color="#e04705">
                <XIcon />
              </IconWrapper>
              <p>Registration failed! The wallet is already registered.</p>
            </PopupContent>
          </CustomPopup>
        ) : null}
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
          {!showQR ? (
            <>
              {" "}
              <FormHeader>
                <h2>Register yourself!</h2>
                <FormIconWrapper onClick={() => setShowInfo(true)}>
                  <QuestionMarkCircleIcon />
                </FormIconWrapper>
              </FormHeader>
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
              <WalletAddress>
                <input
                  type="text"
                  value={
                    accountAddress
                      ? accountAddress.substring(0, 5).concat("...") +
                        accountAddress.substring(accountAddress.length - 4)
                      : ""
                  }
                  disabled
                  placeholder="Wallet Address"
                />
                <WalletStatus>
                  {provider.provider ? (
                    <Status connected={true}>
                      <p>connected</p>
                    </Status>
                  ) : (
                    <Status connected={false} onClick={showPopup}>
                      <p>connect</p>
                    </Status>
                  )}
                </WalletStatus>
              </WalletAddress>
              {email ? (
                <SmallText>
                  By entering email, you agree to receive our updates.
                </SmallText>
              ) : null}
              <Button type={ButtonType.submit}>Register now</Button>
            </>
          ) : (
            <QRCodeWrapper>
              <h2 style={{ marginBottom: "20px" }}>Wallet QR code</h2>
              <QRCode value={accountAddress} />
            </QRCodeWrapper>
          )}
        </SubscribeForm>
      </Content>
    </Container>
  );
};

export default IntroView;
