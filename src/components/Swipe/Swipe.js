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
  const [match, setMatch] = useState(null)

  const setAccepted = () => {
    if (user === 1){
      match.accepted1 = "true";
    }else{
      match.accepted2 = 'true'
    }
    console.log(match);
    matchStore.updateMatch(match)
  }



  const newMatch = async () => {
    return await uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
  };

  const createNewMatch = async () => {
    const nMatch = newMatch();
    setMatch(nMatch)
    return nMatch;
  };

  const startSearching = async (e) => {
    e.preventDefault();
    uiStore.currentUser.viewingUser = "";
    if(match){

    }
    const openMatches = await matchStore.getMatches(uiStore.currentUser);
    if (openMatches.length === 0) {
      const Nmatch = await createNewMatch();
      matchStore.listenToMatch(Nmatch);
      setSearching(true);
      setUser("1");
      setMatch(Nmatch)
    } else {
      openMatches.map((o) => console.log(o));
      openMatches[0].userId2 = uiStore.currentUser.id;
      matchStore.updateMatch(openMatches[0]);
      const user = await userStore.getUserById(openMatches[0].userId1);
      uiStore.currentUser.viewingUser = user;
      matchStore.listenToMatch(openMatches[0]);
      setSearching(true);
      setUser("2");
      setMatch(openMatches[0]);
    }
  };

  return useObserver(() => (
    <div>
      {searching === true ? (
        uiStore.currentUser.viewingUser !== "" ? (
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
              <button onClick={(e) =>setAccepted(e)}>match</button>
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
