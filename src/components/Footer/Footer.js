
import React from "react";
import { Switch, Route } from "react-router-dom";
import style from "./Footer.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";


const Footer = () => {
    return useObserver(() => (
        <footer className={style.footer}>
        <Switch>
        <Route exact path="/">
        <Link to="/" className={style.footer__item}><img className={style.footer__active} src="../../assets/img/footer/home.svg" alt="Home"></img></Link>
        <Link to="/dances" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/dances.svg" alt="Dances"></img></Link>
        <Link to="/profile" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/profile.svg" alt="Profile"></img></Link>
        </Route>
        
        <Route path="/dances">
        <Link to="/" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/home.svg" alt="Home"></img></Link>
        <Link to="/dances" className={style.footer__item}><img className={style.footer__active} src="../../assets/img/footer/dances.svg" alt="Dances"></img></Link>
        <Link to="/profile" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/profile.svg" alt="Profile"></img></Link>
        </Route>

        <Route path="/profile">
        <Link to="/" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/home.svg" alt="Home"></img></Link>
        <Link to="/dances" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/dances.svg" alt="Dances"></img></Link>
        <Link to="/profile" className={style.footer__item}><img className={style.footer__inactive} src="../../assets/img/footer/profile.svg" alt="Profile"></img></Link>
        </Route>
        </Switch>
        </footer>
        ));
        
    };
    
    export default Footer;