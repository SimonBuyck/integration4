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

  // const nextUser = (e) => {
  //   e.preventDefault();
  //   console.log("next");
  // };

  // const isMatch = (e, match) => {
  //   e.preventDefault();
  //   console.log(match);
  // };

  const newMatch = async() => {
    return await uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
  };

  const createNewMatch = async () => {
    const openMatches = await matchStore.getMatches();
    let match = {};
    if(openMatches.length === 0){
      match = newMatch()
    };
    return match;
  };

  // const getMatch = async () => {
  //   const openMatches = await matchStore.getMatches();
  //   if(openMatches.length > 0){
  //     openMatches[0].userId2 = uiStore.currentUser.id;
  //     const match = openMatches[0];
  //     console.log(match);
  //     matchStore.updateMatch(match);
  //     const user = await userStore.getUserById(openMatches[0].userId1);
  //     return user;
  //   } else {

  //   }
  // };

  const startSearching = async (e) => {
    e.preventDefault();
    const openMatches = await matchStore.getMatches();
    if(openMatches.length === 0){
      console.log('new match created')
      console.log(createNewMatch());
    } else {
      console.log('get a free matchRoom')
      openMatches[0].userId2 = uiStore.currentUser.id;
      const user = await userStore.getUserById(openMatches[0].userId1)
      console.log(user)
      setUser(user);
      
    }
    setSearching(true)
  }

  return useObserver(() => (
    <div>
      {searching === true ? user !== null ? <p>{user.name}</p> :<div><p>we are searching</p></div> : <button onClick={(e) => startSearching(e)}>start searching</button>}
    </div>
  ));
};

export default Swipe;
// {/* <div>
//   <video
//     src={openMatches[uiStore.currentUser.viewingUser].video}
//     width="375"
//     autoPlay
//   ></video>
//   <h1>
//     {openMatches[uiStore.currentUser.viewingUser].name}
//     {openMatches[uiStore.currentUser.viewingUser].duo ? (
//       <span> & {openMatches[uiStore.currentUser.viewingUser].partner}</span>
//     ) : (
//       ""
//     )}
//   </h1>
//   <p>{openMatches[uiStore.currentUser.viewingUser].dance}</p>
//   <div>
//     <button
//       onClick={(e) => isMatch(e, openMatches[uiStore.currentUser.viewingUser])}
//     >
//       match
//     </button>
//     <button onClick={nextUser}>skip</button>
//   </div>
// </div>; */}
