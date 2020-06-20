import React from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./Dances.module.css";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Profile = () => {
    
    return useObserver(() => (
        <>
        <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Your Last Dances</h1>
        <span></span>
        </header>
        <main className={style.main + ' ' + style.main__footer}>
        {
                //if there are previous dances:
            }
            {
            

            /* <section className={style.items}>

            //for each van last dances
                <div className={style.item}>
                        <img className={style.item__img} src="../../assets/img/placeholders/placeholder2.jpeg" alt="dancer"></img>
                    <p className={style.item__country}>Kenia</p>
                    <div className={style.item__info}>
                        <p>Fiza</p> 
                        <p className={style.item__info__dance}>Adumu</p>
                    </div>
                </div>

            </section> */}
            {
                //else:
            }
            <p className={style.p}>You haven't done any dances yet.</p>
            <Link to="/swipe" className={style.button}>Find a Dancer</Link>
        </main>
        </>
        ));
    };
    
    export default Profile;