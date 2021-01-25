import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../redux/actions/logIn";
import { NavLink, Redirect } from "react-router-dom";

export interface FrontPageProps {}
interface logInState {
  email: string;
  password: string;
}

const FrontPage: React.FC<FrontPageProps> = () => {
  const isAuth = useSelector((state: any) => state.post.isAuth);
  const [logInInput, setLogInInput] = useState<logInState>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleInput = (e: any) => {
    e.preventDefault();
    setLogInInput({ ...logInInput, [e.target.name]: e.target.value });
  };
  const { email, password } = logInInput;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(logInAction(email, password));
  };
  console.log(logInInput);
  if (isAuth === true) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div className="frontPage">
        <h1 className="primary-heading">BLOG IT</h1>
        <h1 className="primary-heading">LOG IN</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="email"
            onChange={(e) => handleInput(e)}
            name="email"
            type="text"
            value={logInInput.email}
          />
          <input
            placeholder="password"
            onChange={(e) => handleInput(e)}
            name="password"
            type="password"
            value={logInInput.password}
          />
          <button>LOG IN</button>
        </form>
        <h2>
          <NavLink to="/register">Register</NavLink>
        </h2>
      </div>
    </>
  );
};

export default FrontPage;
