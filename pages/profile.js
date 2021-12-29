import Head from "next/head";
import ProfilePage from "../components/ProfilePage";
function profile() {
  return (
    <div>
      <Head>
        <title>C-Chat Profile</title>
        <meta name="description" content="C-Chat Profile" />
      </Head>
      <ProfilePage />
    </div>
  );
}

export default profile;
