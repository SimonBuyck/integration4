import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Swipe.module.css";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";
import Match from "../../models/Match";
import lottie from "lottie-web";
import VideoStartButton from "../VideoStartButton/Video";
import { useHistory } from "react-router-dom";

const Swipe = () => {
  let animationCon = React.createRef();

  const history = useHistory();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationCon.current,
      path: "../../assets/animations/background.json",
      loop: true,
    });
    anim.setSpeed(1);
  }, [animationCon]);

  const { uiStore, userStore, matchStore } = useStore();
  const [searching, setSearching] = useState(false);
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);

  const deleteMatch = (e) => {
    if(match){
      if(match.accepted1 === 'false' || match.accepted2 === 'false'){
        matchStore.deleteMatch(match);
      } else if (match.userId2 === '' || match.userId2 === undefined){
        matchStore.deleteMatch(match);
      }
    }
    e.preventDefault();
    history.push("/");
  };

  const setAccepted = () => {
    if (user === "1") {
      match.accepted1 = "true";
    } else {
      match.accepted2 = "true";
    }
    console.log(match);
    matchStore.updateMatch(match);
  };

  const setDecline = (e) => {
    if (user === "1") {
      match.accepted1 = "false";
    } else {
      match.accepted2 = "false";
    }
    console.log(match);
    matchStore.updateMatch(match);
  };

  const newMatch = async () => {
    return await uiStore.createMatch({
      store: matchStore,
      userId1: uiStore.currentUser.id,
    });
  };

  const createNewMatch = async () => {
    const nMatch = newMatch();
    setMatch(nMatch);
    return nMatch;
  };

  const startSearching = async (e) => {
    e.preventDefault();
    uiStore.currentUser.viewingUser = null;
    const openMatches = await matchStore.getMatches(uiStore.currentUser);
    if (openMatches.length === 0) {
      const Nmatch = await createNewMatch();
      matchStore.listenToMatch(Nmatch);
      setSearching(true);
      setUser("1");
      setMatch(Nmatch);
    } else {
      openMatches.map((o) => console.log(o));
      openMatches[0].userId2 = uiStore.currentUser.id;
      const newMatch = new Match({
        store: matchStore,
        id: openMatches[0].matchId,
        ...openMatches[0],
      });
      matchStore.updateMatch(newMatch);
      const user = await userStore.getUserById(newMatch.userId1);
      uiStore.currentUser.viewingUser = user;
      matchStore.listenToMatch(newMatch);
      console.log(newMatch);
      setSearching(true);
      setUser("2");
      setMatch(newMatch);
    }
  };

  return useObserver(() => (
    <>
      <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Online Dancers</h1>
        <Link className={style.cancel} onClick={(e) => deleteMatch(e)} to="/">
          <img
            src="../../assets/img/icons/cross.svg"
            alt="Cancel"
            height="20px"
          ></img>
        </Link>
      </header>

      {searching === true ? (
        uiStore.currentUser.viewingUser !== null ? (
          match !== null ? (
            match.accepted1 === "true" && match.accepted2 === "true" ? (
              match.roomUrl === undefined || match.roomUrl === "" ? (
                user === "1" ? (
                  <main className={`${style.main} ${style.main__nofooter}`}>
                    <article className={style.searching__wrapper}>
                      <h2 className={style.title}>Creating a call!</h2>
                      <VideoStartButton match={match} />
                    </article>
                  </main>
                ) : (
                  <main className={`${style.main} ${style.main__nofooter}`}>
                    <article className={style.searching__wrapper}>
                      <h2 className={style.title}>Creating a call!</h2>
                    </article>
                  </main>
                )
              ) : (
                <main className={`${style.main} ${style.main__nofooter}`}>
                  <article className={style.searching__wrapper}>
                    <h2 className={style.title}>call created!</h2>
                    <VideoStartButton match={match} />
                  </article>
                </main>
              )
            ) : match.accepted1 === "false" || match.accepted2 === "false" ? (
              <main className={`${style.main} ${style.main__nofooter}`}>
                <article className={style.searching__wrapper}>
                  <h2 className={style.title}>There wasn't a match</h2>
                  <button
                    className={style.button}
                    onClick={(e) => startSearching(e)}
                  >
                    Find New Dance
                  </button>
                </article>
              </main>
            ) : (
              <main className={style.swipe__main}>
                <div className={style.video__wrapper}>
                  <video
                    className={style.video}
                    src={uiStore.currentUser.viewingUser.video}
                    autoPlay
                    loop
                  ></video>
                </div>
                <div className={style.info__wrapper}>
                  <div className={style.info}>
                    <h2 className={style.info__title}>
                      {uiStore.currentUser.viewingUser.dance}{" "}
                      <span className={style.info__title__country}>
                        ({uiStore.currentUser.viewingUser.country})
                      </span>
                    </h2>
                    <p className={style.info__user}>
                      {uiStore.currentUser.viewingUser.name}

                      {uiStore.currentUser.viewingUser.duo ? (
                        <span>
                          {" "}
                          & {uiStore.currentUser.viewingUser.partner}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>

                    <div className={style.buttons}>
                      <button
                        className={style.button__reset}
                        onClick={(e) => setDecline(e)}
                      >
                        <img
                          className={style.button__img}
                          src="../../assets/img/icons/skip.svg"
                          alt="skip"
                        ></img>
                      </button>
                      <button
                        className={style.button__reset}
                        onClick={(e) => setAccepted(e)}
                      >
                        <img
                          className={style.button__img}
                          src="../../assets/img/icons/accept.svg"
                          alt="accept"
                        ></img>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            )
          ) : (
            ""
          )
        ) : (
          <>
            <div className={style.main__nofooter + " " + style.searching}>
              <article
                className={style.searching__wrapper + " " + style.grid__child}
              >
                <img
                  className={style.illustration}
                  alt="searching"
                  src="../../assets/img/illustrations/searching.svg"
                ></img>
                <p className={style.title}>Searching for Matches...</p>
                <div className={style.load_wrapp}>
                  <div className={style.load3}>
                    <div className={style.line}></div>
                    <div className={style.line}></div>
                    <div className={style.line}></div>
                  </div>
                </div>
              </article>
            </div>
          </>
        )
      ) : (
        <main className={`${style.main} ${style.main__nofooter}`}>
          <article className={style.searching__wrapper}>
            <h2 className={style.title}>Start Searching</h2>
            <img
              className={style.illustration}
              alt="start searching"
              src="../../assets/img/illustrations/start_search.svg"
            ></img>
            <button className={style.button} onClick={(e) => startSearching(e)}>
              Find Dance
            </button>
          </article>
        </main>
      )}
    </>
  ));
};

export default Swipe;
// {/*  */}
