import React, { useState } from "react";
import FrontPage from "../src/components/FrontPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import UserPost from "./components/UserPost";
import { ThemeProvider } from "styled-components";
import { getTheme } from "./components/theme/getTheme";
import { THEMES } from "./components/theme/types";
import { Theme } from "./components/theme/styles";
import BlogPosts from "./components/BlogPosts";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [theme, setTheme] = useState<string>(THEMES.LIGHT);
  const handleTheme = (e: any) => {
    e.preventDefault();
    theme === "LIGHT" ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);
  };
  const buttonTheme =
    theme === "DARK" ? (
      <button onClick={(e) => handleTheme(e)}>light mode</button>
    ) : (
      <button onClick={(e) => handleTheme(e)}>dark mode</button>
    );

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <Provider store={store}>
          <Theme>
            <Router>
              {buttonTheme}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <FrontPage theme={theme} />}
                />
                <Route exact path="/register" component={RegisterPage} />
                <Route
                  exact
                  path="/home"
                  render={() => <HomePage theme={theme} />}
                />
                <Route
                  exact
                  path="/user-post/:params_id"
                  render={(props) => <UserPost props={props} />}
                />
                <Route exact path="/blog-posts" component={BlogPosts} />
              </Switch>
            </Router>
          </Theme>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
