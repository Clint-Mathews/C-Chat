import Head from "next/head";
import styled from "styled-components";
import WrapLayout from "../../components/WrapLayout";
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
import { useRouter } from "next/router";
function ShowChat({ chat, messages, chatId }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const messageData = JSON.parse(messages);
  const chatData = JSON.parse(chat);
  if (!chatData?.users?.length > 0) {
    router.replace("/");
    return <></>;
  }
  return (
    <Container>
      <Head>
        <title>
          Chat with {getRecipientEmail(chatData.users, currentUser)}
        </title>
        <meta
          name="description"
          content={`Chat with {getRecipientEmail(chatData.users, currentUser)}`}
        />
      </Head>
      <WrapLayout />
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
  const messageRes = collection(db, "chats", id, "messages");
  const messageQuery = query(messageRes, orderBy("timestamp", "asc"));
  const messageSnapshot = await getDocs(messageQuery);
  const messages = messageSnapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
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
  min-width: 360px;
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
