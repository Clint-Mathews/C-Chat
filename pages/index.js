import Head from "next/head";
import Sidebar from "../components/Sidebar";
export default function Home() {
  return (
    <div>
      <Head>
        <title>C-Chat</title>
        <meta name="description" content="C-Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
