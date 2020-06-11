import React from "react";
// import Sidebar from "../../containers/Sidebar/Sidebar";
// import Content from "../../containers/Content/Content";
import { Switch, Route, NavLink, Redirect, useHistory } from "react-router-dom";
// import { ROUTES } from "../../consts";
// import LoginForm from "./LoginForm";
// import AppHeader from "../../containers/Sidebar/AppHeader";
// import style from "./Authentication.module.css";
// import RegisterForm from "./RegisterForm";
import { useObserver } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../hooks/useStore";
import Swipe from "../Swipe/Swipe";
import VideoStartButton from "../VideoStartButton/Video";

const Authentication = () => {
  const { uiStore } = useStore();

  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();

    const result = uiStore.logoutUser();
    console.log(result);
    history.push("/login");
  };

  return useObserver(() => (
    <>
      <Switch>
        <Route exact path="/login">
          {uiStore.currentUser ? (
            <Redirect to="/" />
          ) : (
            <div>
              <LoginForm />
              <NavLink to="/register">
                <span>Do you want to register?</span>
              </NavLink>
            </div>
          )}
        </Route>
        <Route exact path="/register">
          {uiStore.currentUser ? (
            <Redirect to="/" />
          ) : (
            <div>
              <RegisterForm />
              <NavLink to="/login">
                <span>Do you want to login?</span>
              </NavLink>
            </div>
          )}
        </Route>
        <Route path="/">
          {uiStore.currentUser ? (
            <>
              {uiStore.currentUser ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <></>
              )}
              {/* <Swipe />
              <VideoStartButton /> */}
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </>
  ));
};

export default Authentication;
