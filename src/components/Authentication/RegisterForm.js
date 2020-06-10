import React, { useState } from "react";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStore } from "../../hooks/useStore";
import TextInputGroup from "../TextInputGroup/TextInputGroup";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");

  const { uiStore, userStore } = useStore();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === passwordAgain) {
      const user = new User({
        name: name,
        email: email,
        store: userStore,
        password: password,
      });
      const result = await uiStore.registerUser(user);
      if (result.uid) {
        console.log(result);
        //gebruiker is correct geregistreerd
        history.push(ROUTES.home);
      } else {
        //registratie mislukt
        console.log(result);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
