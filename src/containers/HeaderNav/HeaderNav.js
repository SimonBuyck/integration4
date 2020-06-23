import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { ROUTES } from "../../consts";

const HeaderNav = () => {
  const { userStore, uiStore } = useStore();

  const history = useHistory();

  const changeStatus = (e, status) => {
    e.preventDefault();
    userStore.changeStatus(uiStore.currentUser, status);
    status === "offline"
      ? history.push("/video")
      : history.push("/swipe");
  };

  return (
    <section>
      <Link to={ROUTES.login} onClick={(e) => changeStatus(e, "offline")}>
        video
      </Link>
      <p></p>
      <Link to={ROUTES.swipe} onClick={(e) => changeStatus(e, "searching")}>
        swipe
      </Link>
    </section>
  );
};

export default HeaderNav;
