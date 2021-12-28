import Layout from "./Layout";
import { store } from "../utils/reducer/store";
import { Provider } from "react-redux";
function WrapLayout() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default WrapLayout;
