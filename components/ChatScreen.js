import styled from "styled-components";
import { db } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Message from "./Message";
import { useRouter } from "next/router";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  serverTimestamp,
  addDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useAuth } from "../Auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import FadeMenuDelete from "./FadeMenuDelete";
function ChatScreen({ chat, intialMessages, chatId }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState(intialMessages);
  const [input, setInput] = useState("");
  const recipientEmail = getRecipientEmail(chat.users, currentUser);
  const [recipient, setRecipient] = useState(null);
  const endOfMessageRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  useEffect(() => {
    const messageRef = collection(db, "chats", router.query.id, "messages");
    const messageQuery = query(messageRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      setShowEmoji(false);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp?.toDate().getTime(),
      }));
      // console.log(data);
      setMessages(data ? data : []);
      scrollToBottom();
    });
    let unsubscribeRecipient;
    if (chat.users?.length > 0) {
      // console.log(chat.users);
      const recipientRef = collection(db, "users");
      const recipientQuery = query(
        recipientRef,
        where("email", "==", recipientEmail)
      );
      unsubscribeRecipient = onSnapshot(recipientQuery, (querySnapshot) => {
        const data = querySnapshot?.docs?.[0]?.data();
        // console.log(data);
        setRecipient(data ? data : null);
      });
    }
    return () => {
      unsubscribe;
      unsubscribeRecipient;
    };
  }, [chatId]);
  const scrollToBottom = () => {
    endOfMessageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { lastScene: serverTimestamp() }, { merge: true });
    const messageRef = collection(db, "chats", chatId, "messages");
    await addDoc(messageRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: currentUser.email,
      photoURL: currentUser.photoURL,
    });
    const chatRef = doc(db, "chats", chatId);
    await setDoc(
      chatRef,
      {
        latestMessage: input,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setInput("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    // setShowEmoji(false);
  };
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInfo>
          {recipient ? (
            <h3>{recipient.displayName}</h3>
          ) : (
            <h3>{recipientEmail}</h3>
          )}
          <p>
            Last Active:{" "}
            {recipient ? (
              <TimeAgo datetime={recipient?.lastScene?.toDate()} />
            ) : (
              "Unavailable"
            )}
          </p>
        </HeaderInfo>
        <HeaderIcons>
          {/* <IconButton>
            <AttachFileIcon />
          </IconButton> */}
          <FadeMenuDelete chatId={chatId} />
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {/* Show messages */}
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              user={message.user}
              message={message}
            />
          );
        })}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            setShowEmoji((prev) => !prev);
          }}
        >
          <InsertEmoticonIcon />
        </IconButton>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send
        </button>
        {/* <MicIcon /> */}
      </InputContainer>
      {showEmoji && (
        <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: "100%" }} />
      )}
    </Container>
  );
}

export default ChatScreen;
const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: grey;
    margin: 0px 0px 14px 0px;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 80vh;
`;
const EndOfMessage = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  border: none;
  border-radius: 10px;
  outline: 0;
  flex: 1;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: whitesmoke;
`;
