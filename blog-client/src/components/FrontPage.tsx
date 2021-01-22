import React, { useState } from "react";
export interface FrontPageProps {}
interface logInState {
  email: string;
  password: string;
}

const FrontPage: React.FC<FrontPageProps> = () => {
  const [logInInput, setLogInInput] = useState<logInState>({
    email: "",
    password: "",
  });
  const handleInput = (e: any) => {
    e.preventDefault();
    setLogInInput({ ...logInInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {};
  console.log(logInInput);
  return (
    <>
      <div className="frontPage">
        <h1 className="primary-heading">BLOG IT</h1>
        <h1 className="primary-heading">LOG IN</h1>
        <form action="">
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
      </div>
    </>
  );
};

export default FrontPage;
