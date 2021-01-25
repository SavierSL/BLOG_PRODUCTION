import React from "react";
import FrontPage from "../src/components/FrontPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/home" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
