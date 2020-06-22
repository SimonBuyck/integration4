import React/*, { useState, useEffect }*/ from "react";
// import Sidebar from "../../containers/Sidebar/Sidebar";
// import Content from "../../containers/Content/Content";
// import { Link } from "react-router-dom";
// import { ROUTES } from "../../consts";
// import LoginForm from "./LoginForm";
// import AppHeader from "../../containers/Sidebar/AppHeader";
// import style from "./Authentication.module.css";
// import RegisterForm from "./RegisterForm";
import style from "./Videocss.module.css";
// import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";

const Videocss = () => {

    
    return useObserver(() => (
        <main className={style.call__wrapper}>

{/* DEZE STATES STAAN OOK IN CONTACT MET DE BUTTONS DIE DE GEBRRUIKER TE ZIEN KRIJGT (ZIE FIGMA)

            <section className={style.call__alerts}>

                <article className={style.call__alert}>
                    <h2 className={style.call__alert__title}>It’s your turn to start learning</h2>
                    <p className={style.call__alert__text}>It will be your turn to teach your dance after 15 minutes.</p>
                    <div className={style.call__alert__buttons__nogrid}>
                        <div className={style.call__alert__button}>OK</div>
                    </div>
                </article>

                <article className={style.call__alert}>
                    <h2 className={style.call__alert__title}>It’s your turn to start teaching</h2>
                    <p className={style.call__alert__text}>When done, click the switch icon. You have 15 minutes. </p>
                    <div className={style.call__alert__buttons__nogrid}>
                        <div className={style.call__alert__button}>OK</div>
                    </div>
                </article>

                <article className={style.call__alert}>
                    <h2 className={style.call__alert__title}>It's time to say goodbye...</h2>
                    <p className={style.call__alert__text}>You have both learned a new dance. Do you want to stay longer?</p>
                    <div className={style.call__alert__buttons}>
                        <div className={style.call__alert__button}>Stay</div>
                        <div className={style.call__alert__previous}>Leave</div>
                    </div>
                </article>

                <article className={style.call__alert}>
                    <h2 className={style.call__alert__title}>Do you really want to leave?</h2>
                    <p className={style.call__alert__text}>When leaving, this call will end.</p>
                    <div className={style.call__alert__buttons}>
                        <div className={style.call__alert__button}>Stay</div>
                        <div className={style.call__alert__previous}>Leave</div>
                    </div>
                </article>

            </section>
*/}
            <section className={style.call__bottom__wrapper}>
            <div className={style.call__bottom}>
                <p className={style.call__bottom__timer}>14:59</p>
                <article className={style.buttons}>
                    <img className={style.button} src="../../assets/img/icons/call/hang_up.svg" alt="Hang up"></img>
                    <img className={style.button} src="../../assets/img/icons/call/pause.svg" alt="Pause"></img>
                    <img className={style.button} src="../../assets/img/icons/call/switch.svg" alt="Switch"></img>
                    <img className={style.button} src="../../assets/img/icons/call/like.svg" alt="Like"></img>
                </article>
            </div>
            </section>
            <section className={style.camera__wrapper}>
                <div className={style.camera}>
                   <img alt="placeholder" src="../../assets/img/placeholders/placeholder.jpeg"></img>
                </div>
            </section>
            <section className={style.video__wrapper}>
                <img alt="placeholder" src="../../assets/img/placeholders/placeholder.jpeg"></img>
            </section>
        </main>
        ));
    };
    
    export default Videocss;