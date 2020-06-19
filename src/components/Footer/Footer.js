
import React from "react";
import style from "./Footer.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";


const Footer = () => {
    return useObserver(() => (
        <footer className={style.footer}>
        <Link to="/" className={style.footer__item}><img src="../../assets/img/footer/home.svg" alt="Home"></img></Link>
        <Link to="/dances" className={style.footer__item}><img src="../../assets/img/footer/dances.svg" alt="Dances"></img></Link>
        <Link to="/profile" className={style.footer__item}><img src="../../assets/img/footer/profile.svg" alt="Profile"></img></Link>
        </footer>
        ));
    };
    
    export default Footer;