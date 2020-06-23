import React from "react";
import { Link } from "react-router-dom";
import style from "./Preview.module.css";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { ROUTES } from "../../consts";

const Preview = () => {
  const {uiStore} = useStore();

  return useObserver(() => (
    <>
      <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Preview</h1>
        <Link className={style.cancel} to={ROUTES.profile}>
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
