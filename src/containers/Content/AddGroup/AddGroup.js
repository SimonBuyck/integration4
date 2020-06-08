import React from "react";
import Group from "../../../models/Group";
import { useState } from "react";
import { useStores } from "../../../hooks/useStores";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

import style from "./AddGroup.module.css";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";

const AddGroup = () => {
  const [name, setName] = useState("");

  const { groupStore } = useStores();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const g = new Group({ name, store: groupStore });
    try {
      const newGroup = await groupStore.createGroup(g);
      console.log(newGroup);
      history.push(ROUTES.groupDetail.to + g.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContentHeader title={"Add group"} />
      <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <label className={style.label}>
            <span>Groupname</span>
            <input
              className={style.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <input type="submit" value="Add group" className={style.button} />
        </form>
      </div>
    </>
  );
};

export default AddGroup;
