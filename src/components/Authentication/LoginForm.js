import React, { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import User from "../../models/User";

const LoginForm = () => {
  const { uiStore, userStore } = useStore();

  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const user = new User({
      name: "",
      video: '../../assets/video/video1.mp4',
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
          placeholder="Fill in your email."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          name="password"
          type="password"
          placeholder="Fill in your password."
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </>
  ));
};

export default LoginForm;
