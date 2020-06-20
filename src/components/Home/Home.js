import React from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";
import { useObserver } from "mobx-react-lite";
// import { useStore } from "../../hooks/useStore";

const Home = () => {
    
    return useObserver(() => (
        <>
        <header className={style.home__header}>
        <span></span>
        <h1 className={style.home__header__title}>uDance</h1>
        <span></span>
    </header>
    <main className={style.main + ' ' + style.main__footer}>
        <article>
            <h2 className={style.subtitle}>Dance Around the World</h2>
            <section className={style.main__header}>
                <Link to="/swipe" className={style.main__header__button}>Dance Now <img src="../../assets/img/icons/search.svg" alt="search"></img></Link>
            </section>
        </article>
        <article>
            <div className={style.subtitle__wrapper}>
                <h2 className={style.subtitle}>Learn Something New</h2>
            </div>
            <section className={style.items}>
                <div className={style.item}>
                        <img className={style.item__img} src="../../assets/img/placeholders/placeholder2.jpeg" alt="dancer"></img>
                    <p className={style.item__country}>Kenia</p>
                    <div className={style.item__info}>
                        <p>Fiza</p> 
                        <p className={style.item__info__dance}>Adumu</p>
                    </div>
                </div>
                <div className={style.item}>
                        <img className={style.item__img} src="../../assets/img/placeholders/placeholder3.jpg" alt="dancer"></img>
                    <p className={style.item__country}>Cuba</p>
                    <div className={style.item__info}>
                        <p>Sofia & Rudy</p> 
                        <p className={style.item__info__dance}>Cha Cha</p>
                    </div>
                </div>
            </section>
        </article>
        <article>
            <div className={style.subtitle__wrapper}>
                <h2 className={style.subtitle}>Your Last Dances</h2>
                <Link to="/dances">View All</Link>
            </div>
            {
                //if there are previous dances:
            }
            {/* <section className={style.items}>
                <div className={style.item}>
                        <img className={style.item__img} src="../../assets/img/placeholders/placeholder2.jpeg" alt="dancer"></img>
                    <p className={style.item__country}>Kenia</p>
                    <div className={style.item__info}>
                        <p>Fiza</p> 
                        <p className={style.item__info__dance}>Adumu</p>
                    </div>
                </div>
                <div className={style.item}>
                        <img className={style.item__img} src="../../assets/img/placeholders/placeholder3.jpg" alt="dancer"></img>
                    <p className={style.item__country}>Cuba</p>
                    <div className={style.item__info}>
                        <p>Sofia & Rudy</p> 
                        <p className={style.item__info__dance}>Cha Cha</p>
                    </div>
                </div>
            </section> */}
            {
                //else:
            }
            <p className={style.p}>You haven't done any dances yet.</p>
            <Link to="/swipe" className={style.button}>Find a Dancer</Link>
        </article>
    </main>
        </>
        ));
    };
    
    export default Home;