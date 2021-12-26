import { Grid } from "@material-ui/core";
import Head from "next/head";
import ReactLoading from "react-loading";
function Loading({ type, color }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <Head>
        <title>C-Chat Loading</title>
        <meta name="description" content="C-Chat Loading" />
      </Head>
      <ReactLoading type={type} color={color} height={"5%"} width={"5%"} />
    </Grid>
  );
}
export default Loading;
