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

const Authentication = () => {
  const { userStore, uiStore, matchStore } = useStore();

  const otherUsers = userStore.users.filter(
    (user) => user.id !== uiStore.currentUser.id
  );
  let amount = uiStore.currentUser.viewingUser;

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
    matchStore.matches.map((match) =>
      match.users.includes(
        uiStore.currentUser && otherUsers[uiStore.currentUser.viewingUser]
      )
        ? ((match.match = true),
          amount++,
          amount > otherUsers.length - 1 ? (amount = 0) : "",
          uiStore.currentUser.setViewingUser(amount),
          console.log("match accepted"))
        : (new Match({
            users: [uiStore.currentUser, user],
            store: matchStore,
          }),
          amount++,
          amount > otherUsers.length - 1 ? (amount = 0) : "",
          uiStore.currentUser.setViewingUser(amount),
          console.log("match created"))
    );

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
      {/* <Switch>
        <Route exact path={ROUTES.login}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
            <div className={style.wrapper}>
              <AppHeader name="ThatsApp" title="Login" />
              <LoginForm />
              <NavLink to={ROUTES.register} className={style.textlink}>
                <span>Do you want to register?</span>
              </NavLink>
            </div>
          )}
        </Route>
        <Route exact path={ROUTES.register}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
            <div className={style.wrapper}>
              <AppHeader name="ThatsApp" title="Register" />
              <RegisterForm />
            </div>
          )}
        </Route>
        <Route path={ROUTES.home}>
          {uiStore.currentUser ? (
            <>
              <Sidebar />
              <Content />
            </>
          ) : (
            <Redirect to={ROUTES.login} />
          )}
        </Route>
      </Switch> */}
    </>
  ));
};

export default Authentication;
