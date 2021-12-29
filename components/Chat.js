import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
import { hide } from "../utils/reducer/showHideSidebarSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import formatTime from "../utils/formatTime";
function Chat({ chat, currentUser }) {
  const router = useRouter();
  const dispatch = useDispatch();
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
    }
    getUser();
  }, [recipientEmail]);
  return (
    <>
      <div
        onClick={() => {
          dispatch(hide());
          router.replace(`/chat/${chat.id}`);
        }}
      >
        <Container key={chat.id}>
          {recipientUser ? (
            <UserAvatar
              alt={`${
                recipientUser ? recipientUser.displayName : recipientEmail
              } image`}
              src={recipientUser.photoURL}
            />
          ) : (
            <UserAvatar alt={`${recipientEmail} image`}>
              {recipientEmail[0].toUpperCase()}{" "}
            </UserAvatar>
          )}
          <ChatContainer>
            {recipientUser ? (
              <>
                <MessageTime>
                  <p style={{ margin: 0 }}>{recipientUser.displayName}</p>
                  <MsgTimeStamp>
                    {chat.timestamp ? formatTime(chat.timestamp) : "..."}
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
      </div>
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
