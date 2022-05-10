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
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ethers } from "ethers";

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

  div {
    border-radius: 5px;
    background-color: ${DODGERBLUE.toString()};
    color: #fff;
    padding: 0 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin-right: 10px;
    background: #00c749;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
  max-width: 400px;
  margin: 0 auto;
`;

const SmallText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
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

  const provider = React.useContext(Web3Provider);

  const showPopup = React.useContext(OpenPopup);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email && provider) {
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

      let response_post;

      // Such IF statement, because BE can't receive null or blank string
      if (linkedIn && twitter) {
        response_post = await fetch(
          process.env.REACT_APP_API_LOCATION +
            "/api/v1/account/register_email/",
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
              pfp_nft_address: ethers.constants.AddressZero,
              pfp_token_id: 0,
            }),
          }
        );
      } else if (linkedIn) {
        response_post = await fetch(
          process.env.REACT_APP_API_LOCATION +
            "/api/v1/account/register_email/",
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
              linkedin: linkedIn,
              pfp_nft_address: ethers.constants.AddressZero,
              pfp_token_id: 0,
            }),
          }
        );
      } else if (twitter) {
        response_post = await fetch(
          process.env.REACT_APP_API_LOCATION +
            "/api/v1/account/register_email/",
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
              pfp_nft_address: ethers.constants.AddressZero,
              pfp_token_id: 0,
            }),
          }
        );
      } else {
        response_post = await fetch(
          process.env.REACT_APP_API_LOCATION +
            "/api/v1/account/register_email/",
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
              pfp_nft_address: ethers.constants.AddressZero,
              pfp_token_id: 0,
            }),
          }
        );
      }

      console.log(await response_post.json());

      if (response_post.ok) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } else if (email) {
      showPopup();
    } else {
      const contractAddress = "0x62f915D46E17AED84e2B0c28c4617e2B477DEbC4";

      if (provider) {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          provider.getSigner()
        );

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

  async function fetchData() {
    const accounts = await provider?.listAccounts();

    if (!provider) {
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
              {provider ? (
                <div>
                  <p>connected</p>
                </div>
              ) : null}
            </WalletStatus>
          </WalletAddress>
          {email ? (
            <SmallText>
              By entering email, you agree to receive our updates.
            </SmallText>
          ) : null}
          <Button type={ButtonType.submit}>Register now</Button>
        </SubscribeForm>
      </Content>
    </Container>
  );
};

export default IntroView;
