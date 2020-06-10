import React from "react";
// import Sidebar from "../../containers/Sidebar/Sidebar";
// import Content from "../../containers/Content/Content";
// import { Switch, Route, NavLink, Redirect } from "react-router-dom";
// import { ROUTES } from "../../consts";
// import LoginForm from "./LoginForm";
// import AppHeader from "../../containers/Sidebar/AppHeader";
// import style from "./Authentication.module.css";
// import RegisterForm from "./RegisterForm";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";
import Match from "../../models/Match";

const Swipe = () => {
  const { userStore, uiStore, matchStore } = useStore();

  const otherUsers = userStore.users.filter(
    (user) => user.id !== uiStore.currentUser.id
  );
  let amount = uiStore.currentUser.viewingUser;

  let matches = [];
  matchStore.matches.map((match) =>
    match.users.includes(uiStore.currentUser)
      ? match.creator !== uiStore.currentUser
        ? matches.push(match)
        : ""
      : ""
  );

  const nextUser = (e) => {
    e.preventDefault();
    console.log("next");
    amount++;
    if (amount > otherUsers.length - 1) {
      amount = 0;
    }
    uiStore.currentUser.setViewingUser(amount);
  };

  const match = (e, user) => {
    e.preventDefault();
    if(matches.length !== 0){
      matches.map((match) =>
        match.users.includes(user)
          ? console.log("match found")
          : console.log("match created")
      );
    } else {
      console.log("match created");
      new Match({
        store: matchStore,
        creator: uiStore.currentUser,
        users: [user, uiStore.currentUser],
      });
    }

    console.log(matchStore.matches);
    console.log(matches)

    //store checken als er al een match bestaat met deze mensen
    //anders een nieuwe match aanmaken
  };

  return useObserver(() => (
    <>
      {/* {otherUsers.[uiStore.currentUser.viewingUser]} */}
      <video
        src={otherUsers[uiStore.currentUser.viewingUser].video}
        width="375"
      ></video>
      <h1>
        {otherUsers[uiStore.currentUser.viewingUser].name}
        {otherUsers[uiStore.currentUser.viewingUser].duo ? (
          <span>
            {" "}
            & {otherUsers[uiStore.currentUser.viewingUser].partner.name}
          </span>
        ) : (
          ""
        )}
      </h1>
      <p>{otherUsers[amount].dance}</p>
      <div>
        <button
          onClick={(e) => match(e, otherUsers[uiStore.currentUser.viewingUser])}
        >
          match
        </button>
        <button onClick={nextUser}>skip</button>
      </div>
    </>
  ));
};

export default Swipe;
