import React from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./Profile.module.css";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Profile = () => {
    const { uiStore } = useStore();
    
    const history = useHistory();
    
    const handleLogout = async (e) => {
        e.preventDefault();
        const result = uiStore.logoutUser();
        console.log(result);
        history.push("/login");
    };
    
    return useObserver(() => (
        <>
        <header className={style.header}>
        <span></span>
        <h1 className={style.header__title}>Your Profile</h1>
        <span></span>
        </header>
        <main className={style.main + ' ' + style.main__footer}>
        <div className={style.preview}>
        <img src="../../assets/img/placeholders/placeholder.jpeg" alt="preview"></img>
        <Link to="/preview" className={style.link}>View Preview</Link>
        </div>
        <form>
        <p className={style.link + ' ' + style.change}>Change Preview</p>
        <div className={style.line}></div>
        <div className={style.profile__content}>

        <label for="name" className={style.label}>Your Name</label>
        <input
        className={style.input + ' ' + style.profile__input}
        type="text"
        name="name"
        placeholder="Your name"
        value={uiStore.currentUser.name}
        />

        <label for="partner" className={style.label}>Partner</label>
        <input
        className={style.input + ' ' + style.profile__input}
        type="text"
        name="partner"
        placeholder="Partner"
        value={uiStore.currentUser.partner}
        />

        <label for="country" className={style.label}>Country</label>
        <input
        className={style.input + ' ' + style.profile__input}
        type="text"
        name="country"
        placeholder="Country"
        value={uiStore.currentUser.country}
        />

        <label for="dance" className={style.label}>Dance Name</label>
        <input
        className={style.input + ' ' + style.profile__input}
        type="text"
        name="dance"
        placeholder="Dance name"
        onChange="{onChange}"
        required="required"
        autoComplete="off"
        value={uiStore.currentUser.dance}
        />
        <p className={style.label}>Couple dance</p>
        <span>
        <input 
        className={style.input + ' ' + style.switch} 
        type="checkbox" 
        id="switch"
        name="duo"
        value="duo"
        // {uiStore.currentUser.duo ? "checked" : ""}
        />

        <label className={style.label__checkbox} for="switch"></label>
        </span>
        </div>
        <div className={style.line}></div>
        <p className={style.profile__subtitle}>Private Data</p>
        <div className={style.profile__content}>

        <label for="email" className={style.label}>Email</label>
        <input
        className={style.input + ' ' + style.profile__input + ' ' + style.profile__input__noline}
        type="text"
        name="email"
        placeholder="Email"
        onChange="{onChange}"
        required="required"
        autoComplete="off"
        value={uiStore.currentUser.email}
        />
        </div>
        <div className={style.line}></div>
        </form>
        <button onClick={handleLogout} className={style.logout}>Logout</button>
        </main>
        </>
        ));
    };
    
    export default Profile;