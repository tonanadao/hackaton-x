import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { MediaQuery } from "../hooks/useDeviceType";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/solid";
import { Heading03 } from "../styled/common/heading";
import ClockLoader from "react-spinners/ClockLoader";

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

const IconWrapper = styled.figure<{ color: string }>`
  min-width: 140px;
  min-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 100%;
  margin-left: 60px;

  svg {
    height: 100px;
    width: 100px;
  }

  @media ${MediaQuery.isTablet} {
    min-width: 100px;
    min-height: 100px;
    margin-left: 20px;

    svg {
      height: 60px;
      width: 60px;
    }
  }

  @media ${MediaQuery.isMobile} {
    margin-left: 0;
    margin-top: 40px;
  }
`;

const Notification = styled.div`
  min-height: 240px;
  width: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 20px;
    margin-top: 20px;
    text-decoration: underline;
    cursor: pointer;
  }

  @media ${MediaQuery.isMobile} {
    flex-direction: column;
  }
`;

const NotificationLoader = styled.div`
  min-height: 240px;
  width: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 40px 20px;
  justify-content: center;
  align-items: center;`;

const Activation = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const router = useRouter();
  const { token } = router.query;

  async function activateEmail() {
    const response_post = await fetch(
      process.env.REACT_APP_API_LOCATION +
        "/api/v1/account/activate_email/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );

    if (response_post.ok) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
    console.log(await response_post.json());
  }

  useEffect(() => {
    activateEmail();
  }, []);

  return (
    <Container>
      {showSuccess ? (
        <Notification>
          <article>
            <Heading03> Your e-mail verification was successful.</Heading03>
            <Link href="/" passHref>
              <h2>Return to main page.</h2>
            </Link>
          </article>
          <IconWrapper color="#00c749">
            <CheckIcon />
          </IconWrapper>
        </Notification>
      ) : (
        <NotificationLoader>
          <ClockLoader
            color={"rgb(65, 84, 255)"}
            loading={!showSuccess}
            size={150}
          />
          <p style={{ marginTop: "30px", fontSize: "30px" }}>Loading...</p>
        </NotificationLoader>
      )}
    </Container>
  );
};

export default Activation;
