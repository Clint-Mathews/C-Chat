import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
export default function LoginPage() {
  const [loginDisabled, setLoginDisabled] = useState(false);
  const signIn = () => {
    setLoginDisabled(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoginDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setLoginDisabled(false);
      });
  };
  return (
    <Container>
      <Head>
        <title>C-Chat Login</title>
        <meta name="description" content="C-Chat Login" />
      </Head>
      <LoginContainer>
        {/* Since we can directly access the files in public folder directly */}
        <Logo src="/CChatLogo.png" alt="Chat Icon Img" />
        <Button
          disabled={loginDisabled}
          variant="outlined"
          style={{ textAlign: "center" }}
          onClick={signIn}
        >
          <span style={{ display: "flex", marginRight: "10px" }}>
            <Image
              width="20px"
              height="20px"
              alt="Google sign-in"
              blurDataURL="/google.png"
              src="/google.png"
            />
          </span>
          Sign In
        </Button>
        {/* Next.JS image component  */}
        {/* <Image
          src={img}
          placeholder="blur"
          alt="Chat Icon Img"
          width={420}
          height={400}
        /> */}
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  // Make it center
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: white;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;
