import React, { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import User from "../../models/User";
import style from "./Authentication.module.css";
// import validate from "../../validate"

const LoginForm = () => {
  const { uiStore, userStore } = useStore();

  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const user = new User({
      name: "",
      store: userStore,
      email: email,
      password: password
    });
    const result = await uiStore.loginUser(user);
    console.log(result); 
  }

  return useObserver(() => (
    <>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input className={style.button} type="submit" value="Login" />
      </form>
    </>
  ));
};

export default LoginForm;
