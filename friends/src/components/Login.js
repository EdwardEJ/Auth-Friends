import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const initialState = {
    username: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", state)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      });
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <input text="text" name="username" onChange={inputHandler} />
        <input text="password" name="password" onChange={inputHandler} />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
