import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
function Chat({ id, users, currentUser }) {
  const router = useRouter();
  const [recipientUser, setRecipientUser] = useState(null);
  const recipientEmail = getRecipientEmail(users, currentUser);
  useEffect(() => {
    async function getUser() {
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("email", "==", recipientEmail));
      const usersSnapshot = await getDocs(usersQuery);
      setRecipientUser(
        usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );
    }
    getUser();
  }, [recipientEmail]);
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Container onClick={enterChat}>
      {recipientUser ? (
        <UserAvatar src={recipientUser.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
