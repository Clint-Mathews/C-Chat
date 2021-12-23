import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>C-Chat</title>
        <meta name="description" content="C-Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Lets build C-Chat</h1>
    </div>
  );
}
