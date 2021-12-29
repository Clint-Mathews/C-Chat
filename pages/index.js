import Head from "next/head";
import WrapLayout from "../components/WrapLayout";
import styled from "styled-components";
import Image from "next/image";
export default function Home() {
  return (
    <Container>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>C-Chat</title>
        <meta
          name="description"
          content="C-Chat is a chatting application using firebase and Next.JS"
        />
        <meta name="author" content="Clint Mathews" />
        <meta name="copyright" content="Clint Mathews" />
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="general" />
      </Head>
      <WrapLayout />
      <ChatContainer>
        <Image
          width="400px"
          height="400px"
          alt="C-Chat"
          blurDataURL="/Messages.svg"
          src="/Messages.svg"
        />
        <h2 style={{ color: "white" }}>Lets Start chat!</h2>
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
  background-image: url("back.png");
  background-size: cover;
  background-repeat: no-repeat;
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
