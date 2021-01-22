import React from "react";
import FrontPage from "../src/components/FrontPage";
import { Provider } from "react-redux";
import store from "./redux/store";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Provider store={store}>
        {" "}
        <FrontPage />
      </Provider>
    </>
  );
};

export default App;
