import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/actions/register";

export interface RegisterPageProps {}

interface regState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage: React.FC<RegisterPageProps> = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.post.isAuth);
  const [regInput, setRegInput] = useState<regState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = regInput;
  const handleRegInput = (e: any) => {
    e.preventDefault();
    setRegInput({ ...regInput, [e.target.name]: e.target.value });
    console.log(regInput);
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(registerAction(name, email, password));
    } else {
      console.log("password do not match");
    }
  };
  if (isAuth === true) {
    return <Redirect to="/home" />;
  }
  console.log(isAuth);
  return (
    <>
      {" "}
      <div className="frontPage">
        <h1 className="primary-heading">BLOG IT</h1>
        <h1 className="primary-heading">SIGN UP</h1>
        <form action="" onSubmit={(e) => handleRegister(e)}>
          <input
            placeholder="name"
            name="name"
            type="text"
            value={regInput.name}
            onChange={(e) => handleRegInput(e)}
          />
          <input
            placeholder="email"
            name="email"
            type="text"
            value={regInput.email}
            onChange={(e) => handleRegInput(e)}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            value={regInput.password}
            onChange={(e) => handleRegInput(e)}
          />
          <input
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            value={regInput.confirmPassword}
            onChange={(e) => handleRegInput(e)}
          />
          <button>REGISTER</button>
          <h2>
            <NavLink to="/">Sign In</NavLink>
          </h2>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
