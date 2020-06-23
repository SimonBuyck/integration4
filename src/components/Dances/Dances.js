import React from "react";
import { Link } from "react-router-dom";
import style from "./Dances.module.css";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import MatchPartner from "../MatchPartner/MatchPartner";
import { v4 } from "uuid";
import { ROUTES } from "../../consts";

const Profile = () => {
  const { uiStore } = useStore();

  return useObserver(() => (
    <>
      <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Your Last Dances</h1>
        <span></span>
      </header>
      <main className={style.main + " " + style.main__footer}>
        {uiStore.currentUser.matches.length !== 0 ? (
          <section className={style.items}>
            {uiStore.currentUser.matches.map((m) => (
            <MatchPartner key={v4()} match={m} />
            ))}
          </section>
        ) : (
          <>
            <p className={style.p}>You haven't done any dances yet.</p>
            <Link to={ROUTES.swipe} className={style.button}>
              Find a Dancer
            </Link>
          </>
        )}
      </main>
    </>
  ));
};

export default Profile;
