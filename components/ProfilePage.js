import { useAuth, updateName } from "../Auth";
import styled from "styled-components";
import Image from "next/image";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../firebase";
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
function ProfilePage() {
  const classes = useStyles();
  const { currentUser, updateName } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(currentUser.displayName);
  const updateAndNavigate = async (update) => {
    if (update) {
      if (!name) {
        console.log("Enter name");
      } else {
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, { displayName: name }, { merge: true });
        updateName(name);
        router.replace(`/`);
      }
    } else {
      router.replace(`/`);
    }
  };

  return (
    <Container>
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
            component="img"
            alt="Profile Img"
            height="140"
            image={currentUser.photoURL}
            title="Profile Img"
          />
          <CardContent style={{ cursor: "auto", paddingBottom: "0px" }}>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField
                required
                id="mui-theme-provider-standard-input"
                label="Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField
                disabled
                id="outlined-disabled"
                label="Email"
                defaultValue={currentUser.email}
              />
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions style={{ flexDirection: "column" }}>
          <ButtonContainer>
            <SaveButton
              aria-label="Update Profile"
              style={{ marginRight: "10px" }}
              variant="outlined"
              color="primary"
              onClick={() => updateAndNavigate(true)}
            >
              Update
            </SaveButton>
            <CancelButton
              variant="outlined"
              aria-label="Cancel Changes"
              onClick={() => updateAndNavigate(false)}
            >
              Cancel
            </CancelButton>
          </ButtonContainer>
        </CardActions>
      </Card>
    </Container>
  );
}

export default ProfilePage;

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

const ButtonContainer = styled.div``;
const SaveButton = styled(Button)`
  background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
  );

  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #7a7474;
  border-radius: 10px;
  display: block;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
const CancelButton = styled(Button)`
  background-image: linear-gradient(
    to right,
    #d31027 0%,
    #ea384d 51%,
    #d31027 100%
  );
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #7a7474;
  border-radius: 10px;
  display: block;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
