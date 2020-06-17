import React, { useState } from "react";
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
  const { userStore, uiStore, matchStore} = useStore();

  const openMatches = matchStore.getMatches() 
  console.log(openMatches) 

  const createNewMatch = () => {
    const match = uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
    console.log(match);
  }

  const nextUser = (e) => {
    e.preventDefault();
    console.log("next");
    createNewMatch()
  };

  const isMatch = (e, user) => {
    e.preventDefault();
    console.log(user);

  };

  return useObserver(() => (
    <>
      <div>
        <video
          src={userStore.users[uiStore.currentUser.viewingUser].video}
          width="375"
          autoPlay
        ></video>
        <h1>
          {userStore.users[uiStore.currentUser.viewingUser].name}
          {userStore.users[uiStore.currentUser.viewingUser].duo ? (
            <span>
              {" "}
              & {userStore.users[uiStore.currentUser.viewingUser].partner}
            </span>
          ) : (
            ""
          )}
        </h1>
        <p>{userStore.users[uiStore.currentUser.viewingUser].dance}</p>
        <div>
          <button
            onClick={(e) =>
              isMatch(e, userStore.users[uiStore.currentUser.viewingUser])
            }
          >
            match
          </button>
          <button onClick={nextUser}>skip</button>
        </div>
      </div>
    </>
  ));
};

export default Swipe;
