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
  const { userStore, matchStore } = useStore();
  // const [matchId, setMatchId] = useState("");

  const openMatches = matchStore.getMatches();
  console.log(openMatches);

  // const createNewMatch = async () => {
  //   const match = await uiStore.createMatch({
  //     store: matchStore,
  //     userId1: uiStore.currentUser.id,
  //   });
  //   setMatchId(match.id);
  //   console.log(matchId);
  // };

  // const nextUser = (e) => {
  //   e.preventDefault();
  //   console.log("next");
  //   createNewMatch();
  // };

  // const isMatch = (e, user) => {
  //   e.preventDefault();
  //   console.log(user);
  // };

  const getUserById = async () =>{
    const openMatches = await matchStore.getMatches();
    console.log(openMatches)
    const result = userStore.getUserById()
    console.log(result);
  }

  return useObserver(() => (
    <>
      {openMatches.length === 0 ? (
        <p>Searching</p>
      ) : (
        getUserById()
      )}
    </>
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
