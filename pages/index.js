import Head from "next/head";
import WrapLayout from "../components/WrapLayout";
import styled from "styled-components";
import Image from "next/image";
export default function Home() {
  return (
    <Container>
      <Head>
        <title>C-Chat</title>
        <meta name="description" content="C-Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WrapLayout />
      <ChatContainer>
        <Image
          width="200px"
          height="200px"
          alt="C-Chat"
          blurDataURL="/CChatLogo.png"
          src="/CChatLogo.png"
        />
        <p>Lets Start chatting</p>
      </ChatContainer>
    </Container>
  );
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
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
