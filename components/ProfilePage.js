import { useAuth, updateName } from "../Auth";
import styled from "styled-components";
import Image from "next/image";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../firebase";

function ProfilePage() {
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
      <ImageContainer>
        <Image
          quality="100"
          height="200px"
          width="200px"
          blurDataURL={currentUser.photoURL}
          src={currentUser.photoURL}
          alt="Profile Image"
        />
      </ImageContainer>
      <NameContainer>
        <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
      </NameContainer>
      <EmailContainer>
        <TextField
          disabled
          id="outlined-disabled"
          label="Email"
          defaultValue={currentUser.email}
          variant="outlined"
        />
      </EmailContainer>
      <ButtonContainer>
        <Button
          aria-label="Update Profile"
          style={{ marginRight: "10px" }}
          variant="outlined"
          color="primary"
          onClick={() => updateAndNavigate(true)}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          aria-label="Cancel Changes"
          onClick={() => updateAndNavigate(false)}
        >
          Cancel
        </Button>
      </ButtonContainer>
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
`;
const ImageContainer = styled.div`
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 20px;
`;
const NameContainer = styled.div`
  margin-bottom: 20px;
`;
const EmailContainer = styled.div`
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div``;
