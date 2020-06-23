import React from "react";
import style from "../Home/Home.module.css";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const MatchPartner = ({ match }) => {
  const { uiStore, userStore } = useStore();
  let user = null;

  if (match) {
    if (match.userId1) {
      if (match.userId2) {
        if (match.userId1 !== uiStore.currentUser.id) {
          user = userStore.getUserById(match.userId1);
        } else {
          user = userStore.getUserById(match.userId2);
        }
      }
    }
  }

  return useObserver(() => (
    <>
      {user !== null ? (
        <div className={style.item}>
          <img
            className={style.item__img}
            src="../../assets/img/placeholders/placeholder3.jpg"
            alt="dancer"
          ></img>
          <p className={style.item__country}>{user.country}</p>
          <div className={style.item__info}>
            <p>{user.duo ? `${user.name} & ${user.partner}` : user.name}</p>
            <p className={style.item__info__dance}>{user.dance}</p>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  ));
};

export default MatchPartner;
