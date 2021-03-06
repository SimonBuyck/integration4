import React from "react";
// import Sidebar from "../../containers/Sidebar/Sidebar";
// import Content from "../../containers/Content/Content";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import style from "./Authentication.module.css";
import { useObserver } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../hooks/useStore";
import Content from "../../containers/Content";

const Authentication = () => {
  const { uiStore } = useStore();

  return useObserver(() => (
    <>
      {uiStore.currentUser ? <Content /> : <Redirect to="/login" />}
      <Switch>
        <Route exact path="/login">
          {uiStore.currentUser ? (
            <Redirect to="/" />
          ) : (
            <>
              <header className={style.header}></header>
              <main className={style.main}>
                <h1 className={style.title}>uDance</h1>
                <h2 className={style.subtitle}>Login</h2>
                <LoginForm />
                <div className={style.button + " " + style.button__secondary}>
                  <NavLink to="/register">
                    <span className={style.signup}>Sign up</span>
                  </NavLink>
                </div>
              </main>
            </>
          )}
        </Route>

        <Route exact path="/register">
          {uiStore.currentUser ? (
            <Redirect to="/" />
          ) : (
            <>
              <header className={style.header}>
                <NavLink className={style.return} to="/login">
                  <img
                    src="../../assets/img/icons/back_arrow.svg"
                    alt="Sign up"
                    height="20px"
                  ></img>
                </NavLink>
                <h1 className={style.header__title}>Sign Up</h1>
                <span></span>
              </header>
              <main className={style.main}>
                <RegisterForm />
              </main>
            </>
          )}
        </Route>
      </Switch>
    </>
  ));
};

export default Authentication;
