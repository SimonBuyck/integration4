import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useStores } from "../../../hooks/useStores.js";
import { ROUTES } from "../../../consts/index.js";

import User from "../../../models/User.js";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";
import style from "./AddUser.module.css";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const { userStore } = useStores();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const u = new User({ email: email, store: userStore });
    
    try{
      await userStore.createContact(u);
      history.push(ROUTES.userDetail.to + u.id);
    }catch (error){
      console.log(error);
    }
  };

  return (
    <>
      <ContentHeader title={"Add contact"} />
      <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="name" className={style.label}>
            Email:
            <input
              className={style.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <input type="submit" value="Add contact" className={style.button} />
        </form>
      </div>
    </>
  );
};

export default AddUser;
