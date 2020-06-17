import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const HeaderNav = () => {
  const { userStore, uiStore, matchStore } = useStore();

  const history = useHistory();

  const newMatch = () => {
    uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
  };

  const createNewMatch = async () => {
    const openMatches = await matchStore.getMatches();
    openMatches.length === 0 ? newMatch() : console.log("their are matches");
    history.push("/swipe");
  };

  const changeStatus = (e, status) => {
    e.preventDefault();
    userStore.changeStatus(uiStore.currentUser, status);
    status === "searching"
      ? userStore.getAllSearchingUsers(uiStore.currentUser) &&
        history.push("/video")
      : createNewMatch();
  };

  return (
    <section>
      <Link to="/video" onClick={(e) => changeStatus(e, "searching")}>
        video
      </Link>
      <p></p>
      <Link to="/swipe" onClick={(e) => changeStatus(e, "offline")}>
        swipe
      </Link>
    </section>
  );
};

export default HeaderNav;
