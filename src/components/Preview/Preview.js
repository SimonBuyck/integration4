import React from "react";
// import Sidebar from "../../containers/Sidebar/Sidebar";
// import Content from "../../containers/Content/Content";
import { Link } from "react-router-dom";
// import { ROUTES } from "../../consts";
// import LoginForm from "./LoginForm";
// import AppHeader from "../../containers/Sidebar/AppHeader";
// import style from "./Authentication.module.css";
// import RegisterForm from "./RegisterForm";
import style from "./Preview.module.css";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";

const Preview = () => {
  const { uiStore, userStore } = useStore();

  const getUser = async () => {
    const currentUser = await userStore.getUserByEmail(
      uiStore.currentUser.email
    );
    console.log(currentUser);
    uiStore.currentUser = currentUser;
  };
  console.log(getUser)

  return useObserver(() => (
    <>
      <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Preview</h1>
        <Link className={style.cancel} to="/profile">
          <img
            src="../../assets/img/icons/cross.svg"
            alt="Cancel"
            height="20px"
          ></img>
        </Link>
      </header>
      <main className={style.swipe__main}>

            <div className={style.video__wrapper}>
              <video
                className={style.video}
                src={uiStore.currentUser.video}
                autoPlay
                loop
              ></video>
            </div>
            <div className={style.info__wrapper}>
              <div className={style.info}>
                <h2 className={style.info__title}>
                  {uiStore.currentUser.dance}{" "}
                  <span className={style.info__title__country}>
                    ({uiStore.currentUser.country})
                  </span>
                </h2>
                <p className={style.info__user}>
                  {uiStore.currentUser.name}

                  {uiStore.currentUser.duo ? (
                    <span> & {uiStore.currentUser.partner}</span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </main>
    </>
  ));
};

export default Preview;
