import React from "react";
import { Switch, Route } from "react-router-dom";
import style from "./Footer.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

const Footer = () => {
  return useObserver(() => (
    <footer className={style.footer}>
      <Switch>
        <Route exact path={ROUTES.home}>
          <Link to={ROUTES.home} className={style.footer__item}>
            <img
              className={style.footer__active}
              src="../../assets/img/footer/home.svg"
              alt="Home"
            ></img>
          </Link>
          <Link to={ROUTES.dances} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/dances.svg"
              alt="Dances"
            ></img>
          </Link>
          <Link to={ROUTES.profile} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/profile.svg"
              alt="Profile"
            ></img>
          </Link>
        </Route>

        <Route path={ROUTES.dances}>
          <Link to={ROUTES.home} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/home.svg"
              alt="Home"
            ></img>
          </Link>
          <Link to={ROUTES.dances} className={style.footer__item}>
            <img
              className={style.footer__active}
              src="../../assets/img/footer/dances.svg"
              alt="Dances"
            ></img>
          </Link>
          <Link to={ROUTES.profile} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/profile.svg"
              alt="Profile"
            ></img>
          </Link>
        </Route>

        <Route path={ROUTES.profile}>
          <Link to={ROUTES.home} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/home.svg"
              alt="Home"
            ></img>
          </Link>
          <Link to={ROUTES.dances} className={style.footer__item}>
            <img
              className={style.footer__inactive}
              src="../../assets/img/footer/dances.svg"
              alt="Dances"
            ></img>
          </Link>
          <Link to={ROUTES.profile} className={style.footer__item}>
            <img
              className={style.footer__active}
              src="../../assets/img/footer/profile.svg"
              alt="Profile"
            ></img>
          </Link>
        </Route>
      </Switch>
    </footer>
  ));
};

export default Footer;
