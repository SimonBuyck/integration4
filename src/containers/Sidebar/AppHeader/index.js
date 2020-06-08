import React from "react";

import style from "./../Sidebar.module.css";
import UnreadMessages from "../../../components/UnreadMessages/UnreadMessages";
import { useStores } from "../../../hooks/useStores";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

const AppHeader = ({ name, title, unreadLength }) => {
  const { uiStore } = useStores();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();

    const result = uiStore.logoutUser();
    console.log(result);
    history.push(ROUTES.login);
  };

  return (
    <header className={style.header}>
      <div className={style.appnamewrapper}>
        <h2 className={style.title}>{name}</h2>
        {uiStore.currentUser ? (
          <button onClick={handleLogout} className={style.button}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
      <span className={style.unread}>
        <UnreadMessages length={unreadLength} />
        {title}
      </span>
    </header>
  );
};

export default AppHeader;
