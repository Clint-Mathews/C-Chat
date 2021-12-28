import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
function Chat({ chat, currentUser }) {
  const [recipientUser, setRecipientUser] = useState(null);
  const recipientEmail = getRecipientEmail(chat.users, currentUser);
  useEffect(() => {
    async function getUser() {
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("email", "==", recipientEmail));
      const usersSnapshot = await getDocs(usersQuery);
      setRecipientUser(
        usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );
      // console.log(
      //   usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      // );
    }
    getUser();
  }, [recipientEmail]);
  // console.log(chat);
  return (
    <>
      <Link href={`/chat/${chat.id}`}>
        <a>
          <Container key={chat.id}>
            {recipientUser ? (
              <UserAvatar src={recipientUser.photoURL} />
            ) : (
              <UserAvatar> {recipientEmail[0].toUpperCase()} </UserAvatar>
            )}
            <ChatContainer>
              {recipientUser ? (
                <>
                  <MessageTime>
                    <p style={{ margin: 0 }}>{recipientUser.displayName}</p>
                    <MsgTimeStamp>
                      {chat.timestamp
                        ? moment(chat.timestamp).format("LT")
                        : "..."}
                    </MsgTimeStamp>
                  </MessageTime>
                  <LastMessage>{chat.latestMessage}</LastMessage>
                </>
              ) : (
                <>
                  <MessageTime>
                    <p>{recipientEmail}</p>
                    {/* <MsgTimeStamp>
                      {chat.timestamp
                        ? moment(chat.timestamp).format("LT")
                        : "..."}
                    </MsgTimeStamp> */}
                  </MessageTime>
                  {/* <LastMessage></LastMessage> */}
                </>
              )}
            </ChatContainer>
          </Container>
        </a>
      </Link>
    </>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
const ChatContainer = styled.div`
  width: 100%;
`;
const LastMessage = styled.div`
  color: gray;
  font-size: 14px;
`;
const MsgTimeStamp = styled.div`
  color: gray;
  font-size: 14px;
`;

const MessageTime = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
