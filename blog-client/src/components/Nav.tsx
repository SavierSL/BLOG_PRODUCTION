import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { logOutUser } from "../redux/actions/users";
import { THEMES } from "./theme/types";
import { useDispatch, useSelector } from "react-redux";

export interface NavProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Nav: React.FC<NavProps> = ({ theme, setTheme }) => {
  const dispatch = useDispatch();
  const [logoutClick, setLogoutClick] = useState(false);
  const token = localStorage.getItem("token");

  const handleTheme = (e: any) => {
    e.preventDefault();
    theme === "LIGHT" ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);
  };

  const buttonStyle: any = {
    borderRadius: "1rem",
    margin: "2.5rem",
    border: "none",
    padding: "1rem",
    cursor: "pointer",
    right: "0",
    top: "0",
  };
  const buttonTheme =
    theme === "DARK" ? (
      <button style={buttonStyle} onClick={(e) => handleTheme(e)}>
        light mode
      </button>
    ) : (
      <button style={buttonStyle} onClick={(e) => handleTheme(e)}>
        dark mode
      </button>
    );
  const handleLogout = (e: any) => {
    e.preventDefault();
    console.log("logout");
    console.log(token);
    dispatch(logOutUser());
    setLogoutClick(!logoutClick);
  };
  return (
    <>
      <div
        style={{ background: theme === "LIGHT" ? "yellow" : "#000" }}
        className="navContainer"
      >
        <div className="navContainer_navTitle">
          <h1 className="secondary-heading">BLOG IT</h1>
          {buttonTheme}
        </div>
        <div className="navContainer_navButtons">
          <button className="primary-button" onClick={(e) => handleLogout(e)}>
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
