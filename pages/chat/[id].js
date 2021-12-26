import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
function ShowChat({ chat, messages, chatId }) {
  const { currentUser } = useAuth();
  const messageData = JSON.parse(messages);
  const chatData = JSON.parse(chat);
  return (
    <Container>
      <Head>
        <title>
          Chat with {getRecipientEmail(chatData.users, currentUser)}
        </title>
        <meta name="description" content="Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen
          chat={chatData}
          intialMessages={messageData}
          chatId={chatId}
        />
      </ChatContainer>
    </Container>
  );
}
export default ShowChat;
export async function getServerSideProps(context) {
  const id = context.query.id;

  const chatRef = doc(db, "chats", id);
  const chatSnap = await getDoc(chatRef);
  const chat = { id: chatSnap.id, ...chatSnap.data() };
  // console.log("chat");
  // console.log(chat);
  const messageRes = collection(db, "chats", id, "messages");
  const messageQuery = query(messageRes, orderBy("timestamp", "asc"));
  const messageSnapshot = await getDocs(messageQuery);
  const messages = messageSnapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  // console.log("messages");
  // console.log(messages);
  return {
    props: {
      chat: JSON.stringify(chat),
      messages: JSON.stringify(messages ? messages : []),
      chatId: id,
    },
  };
}
const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ns-overflow-stlye: none;
  scrollbar-width: none;
`;
