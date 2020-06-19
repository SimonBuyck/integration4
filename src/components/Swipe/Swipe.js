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

const Swipe = () => {
  const { uiStore, userStore, matchStore } = useStore();
  const [searching, setSearching] = useState(false);
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);

  const newMatch = async () => {
    return await uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
  };

  const createNewMatch = async () => {
    const match = newMatch();
    return match;
  };

  const startSearching = async (e) => {
    e.preventDefault();
    uiStore.currentUser.viewingUser = '';
    const openMatches = await matchStore.getMatches(uiStore.currentUser);
    if (openMatches.length === 0) {
      console.log("new match created");
      const Nmatch = await createNewMatch();
      console.log("match created: ", Nmatch);
      const listenMatch = matchStore.listenToMatch(Nmatch);
      setMatch(listenMatch);
      if (listenMatch) {
        console.log(listenMatch);
      }
      console.log(listenMatch);
      setSearching(true);
    } else {
      openMatches.map((o) => console.log(o));
      console.log("get a free matchRoom");
      openMatches[0].userId2 = uiStore.currentUser.id;
      matchStore.updateMatch(openMatches[0]);
      const user = await userStore.getUserById(openMatches[0].userId1);
      uiStore.currentUser.viewingUser = user;
      console.log(uiStore.currentUser.viewingUser);
      matchStore.listenToMatch(openMatches[0]);
      setSearching(true);
    }
  };

  return useObserver(() => (
    <div>
      {searching === true ? (
        uiStore.currentUser.viewingUser !== '' ? (
          <div>
            {uiStore.currentUser.viewingUser ? (
              <p>{uiStore.currentUser.viewingUser.id}</p>
            ) : (
              <p>no match userId2</p>
            )}
            <video
              src={uiStore.currentUser.viewingUser.video}
              width="375"
              autoPlay
            ></video>
            <h1>
              {uiStore.currentUser.viewingUser.name}
              {uiStore.currentUser.viewingUser.duo ? (
                <span> & {uiStore.currentUser.viewingUser.partner}</span>
              ) : (
                ""
              )}
            </h1>
            <p>{uiStore.currentUser.viewingUser.dance}</p>
            <div>
              <button>match</button>
              <button onClick={(e) => startSearching(e)}>skip</button>
            </div>
          </div>
        ) : (
          <div>
            <p>we are searching</p>
          </div>
        )
      ) : (
        <button onClick={(e) => startSearching(e)}>start searching</button>
      )}
    </div>
  ));
};

export default Swipe;
// {/*  */}
