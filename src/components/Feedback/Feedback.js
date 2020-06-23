import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Feedback.module.css";
import { useObserver } from "mobx-react-lite";
import lottie from "lottie-web"

const Feedback = () => {
    let animationContainer = React.createRef()

    useEffect(() => {
      lottie.loadAnimation({
        container: animationContainer.current,
        path: "../../assets/animations/background.json"
      });
    }, [animationContainer]);
    
    return useObserver(() => (
        <main className={style.main}>
            <div className={style.feedback__wrapper}>
                <article>
                    <h1 className={style.feedback__title}>You completed this lesson!</h1>
                    <p>How would you rate this lesson?</p>
                    <section className={style.rating__wrapper}>
                        <div className={style.rating}>
                            <input type="radio" id="star5" name="star" value="5"></input><label for="star5"></label>
                            <input type="radio" id="star4" name="star" value="4"></input><label for="star4"></label>
                            <input type="radio" id="star3" name="star" value="3"></input><label for="star3"></label>
                            <input type="radio" id="star2" name="star" value="2"></input><label for="star2"></label>
                            <input type="radio" id="star1" name="star" value="1"></input><label for="star1"></label>
                        </div>
                    </section>
                    <Link to={ROUTES.home} className={style.button}>Send Feedback</Link>
                </article>
            </div>
            <video className={style.video} src="../../assets/animations/firework.mp4" alt="firework" autoPlay></video>
        </main>
        ));
    };
    
    export default Feedback;