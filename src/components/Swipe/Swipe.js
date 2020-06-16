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

  let amount = uiStore.currentUser.viewingUser;

  const nextUser = (e) => {
    e.preventDefault();
    console.log("next");
    amount++;
    console.log(amount);
    if (amount > userStore.users.length - 1) {
      amount = 1;
    }
    uiStore.currentUser.viewingUser = amount;
    console.log(userStore.users[amount]);
  };

  const match = (e, user) => {
    e.preventDefault();
    console.log(user);
    if(user.likes){
      if(user.likes.includes(uiStore.currentUser.id)){
        
      } else {
        uiStore.currentUser.likes.push(user);
        userStore.createLikeForUser(uiStore.currentUser, user.email);
      }
    }
    amount++;
    console.log(amount);
    if (amount > userStore.users.length - 1) {
      amount = 1;
    }
    uiStore.currentUser.viewingUser = amount;
    console.log(userStore.users[amount]);
    // console.log(matchStore.matches);

    //store checken als er al een match bestaat met deze mensen
    //anders een nieuwe match aanmaken
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
              match(e, userStore.users[uiStore.currentUser.viewingUser])
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
