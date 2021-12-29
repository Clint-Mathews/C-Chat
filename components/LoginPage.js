import Head from "next/head";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
});
export default function LoginPage() {
  const classes = useStyles();
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
      <Card
        style={{
          borderRadius: "10px",
          background: "#2f3437",
          boxShadow: "35px 35px 58px #131516, -35px -35px 58px #4b5358",
        }}
        className={classes.root}
      >
        <CardContent style={{ cursor: "auto", paddingBottom: "0px" }}>
          <CardMedia
            style={{ width: "100%", height: "100%" }}
            component="img"
            alt="C-Chat"
            image="/CChatTransparent.png"
            title="C-Chat"
          />
        </CardContent>
        <CardActions style={{ flexDirection: "column" }}>
          <ButtonContainer>
            <SaveButton
              aria-label="Login"
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
            </SaveButton>
          </ButtonContainer>
        </CardActions>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-image: url("back.png");
  background-size: cover;
  background-repeat: no-repeat;
  &&& input {
    color: white !important;
  }
  &&& label {
    color: white !important;
  }
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
const ButtonContainer = styled.div``;
const SaveButton = styled(Button)`
  background-color: #20bf55;
  background-image: linear-gradient(315deg, #20bf55 0%, #01baef 74%);

  margin: 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #7a7474;
  border-radius: 10px;
  display: flex;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
