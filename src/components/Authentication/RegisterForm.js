import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import { useStores } from "../../hooks/useStores";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");

  const { uiStore, userStore } = useStores();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordAgain) {
      const user = new User({
        name: name,
        email: email,
        store: userStore,
        password: password,
      });
      // const result = await uiStore.registerUser(user);
      // if (result.id) {
      uiStore.setCurrentUser(user);
      history.push("/Games");
      // } else {
      //   //registratie mislukt
      //   console.log(result);
      // }
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <TextInputGroup
          label="Name"
          name="name"
          type="name"
          placeholder="Fill in your name."
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
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
          type="password"
          name="Password"
          placeholder="Fill in your password."
          value={password}
          onChange={(e) => setPassWord(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Passwordagain"
          type="password"
          name="Passwordagain"
          placeholder="Fill in your password again."
          value={passwordAgain}
          onChange={(e) => setPassWordAgain(e.currentTarget.value)}
        />
        <input type="submit" value="Register" className={style.button} />
      </form>
    </div>
  );
};

export default RegisterForm;
