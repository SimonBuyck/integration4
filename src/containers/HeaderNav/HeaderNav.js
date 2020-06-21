import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

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
      <Link to="/video" onClick={(e) => changeStatus(e, "offline")}>
        video
      </Link>
      <p></p>
      <Link to="/swipe" onClick={(e) => changeStatus(e, "searching")}>
        swipe
      </Link>
<<<<<<< HEAD
=======
      <p></p>
      <Link to="/profile" /*onClick={(e) => changeStatus(e, "searching")}*/>
        profile
      </Link>
>>>>>>> develop
    </section>
  );
};

export default HeaderNav;
