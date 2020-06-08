import React from "react";

import style from "./../Sidebar.module.css";
import UnreadMessages from "../../../components/UnreadMessages/UnreadMessages";
import { useStore } from "../../../hooks/useStore";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

const AppHeader = ({ name, title, unreadLength }) => {
  const { uiStore } = useStore();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await uiStore.logout();
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={style.header}>
      <div className={style.appnamewrapper}>
        <h2 className={style.title}>{name}</h2>
        <button onClick={handleLogout} className={style.button}>
          Logout
        </button>
      </div>
      <span className={style.unread}>
        <UnreadMessages length={unreadLength} />
        {title}
      </span>
    </header>
  );
};

export default AppHeader;
