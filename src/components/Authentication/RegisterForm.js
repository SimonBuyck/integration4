import React, { useState } from "react";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import firebase from "firebase";
import style from "./Authentication.module.css";
import { useObserver } from "mobx-react-lite";
import { set } from "mobx";

// TO DO
// Validatie op input fields
// Zorgen dat Duo wordt opgeslaan wnr we naar de volgende pagina gaan
// Controleren als duo is gechecked, in dit geval ook aanpassingen doen aan classNames
// (Staat al klaar met commentaar erbij, line 148)

// De gebruiker zelf een opname kunnen laten maken ipv enkel de mogelijkheid te geven om een video te uploaden.

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [Uname, setUName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");
  const [videoSource, setVideoSource] = useState(null);
  const [dance, setDance] = useState("");
  const [country, setCountry] = useState("");
  const [duo, setDuo] = useState(false);
  const [partner, setPartner] = useState("");
  const [step, setStep] = useState("1");

  const { uiStore, userStore } = useStore();
  const history = useHistory();

  // zorgen dat deze niet onmiddelijk naar de server wordt geupload
  //maar dat deze in preview mode staat.
  const getVideoURL = async (e, file) => {
    e.preventDefault();
    const uploadTask = firebase.storage().ref(`videos/${file.name}`).put(file);

    await uploadTask;
    // setting the video preview url/source
    const urls = firebase
      .storage()
      .ref("videos/")
      .child(file.name)
      .getDownloadURL()
      .then((url) => setVideoSource(url));

    await urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === passwordAgain) {
      const user = new User({
        name: Uname,
        email: email,
        store: userStore,
        password: password,
        country: country,
        video: videoSource,
        dance: dance,
        duo: duo,
        partner: partner,
      });
      const result = await uiStore.registerUser(user);
      if (result.uid) {
        console.log(result);
        //gebruiker is correct geregistreerd
        history.push("/");
      } else {
        //registratie mislukt
        console.log(result);
      }
    }
  };

  // const handleValidate = event => {
  //   event.preventDefault();
  //   const isValid = this.validate();
  //   console.log(validate());
  //   if (isValid) {
  //     console.log(this.state);
  //     // clear form
  //     this.setState(initialState);
  //   }
  // };

  // const initialState = {
  //   email:"",
  //   password:"",
  //   name:"",
  //   partner:"",
  //   country:"",
  //   dance:""
  // };

  // const state = initialState;

  // const validate = () => {
  //   let nameError = "";
  //   let emailError = "";
  //   let passwordError = "";

  //   if (!this.state.name) {
  //     nameError = "name cannot be blank";
  //   }

  //   if (!this.state.email.includes("@")) {
  //     emailError = "invalid email";
  //   }

  //   if (!this.state.password) {
  //     passwordError = "password cannot be blank";
  //   }

  //   if (emailError || nameError || passwordError) {
  //     this.setState({ emailError, nameError, passwordError });
  //     return false;
  //   }

  //   return true;
  // };

  return useObserver(() => (
    <div>
      <form onSubmit={handleSubmit}>
        {step !== "1" ? (
          step !== "2" ? (
            step !== "3" ? (
              <>
                <h2 className={style.title}>Let's dance</h2>
                <TextInputGroup
                  label="Dance"
                  type="text"
                  name="dance"
                  placeholder="Dance name"
                  value={dance}
                  onChange={(e) => setDance(e.currentTarget.value)}
                />
                <p className={style.subtitle}>Show a preview of your dance</p>
                <label className={style.button}>
                  {/*<img src="../../assets/upload.svg"></img>*/}Select a
                  video...
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => getVideoURL(e, e.target.files[0])}
                  ></input>
                </label>
                <video src={videoSource} width="200" autoPlay></video>
                <input
                  className={style.button}
                  type="submit"
                  value="Create Account"
                />
                <button
                  className={style.previous}
                  onClick={function (e) {
                    e.preventDefault();
                    setStep("3");
                  }}
                >
                  Previous step
                </button>
              </>
            ) : (
              <>
                <h2 className={style.title}>Nice to meet you!</h2>
                <TextInputGroup
                  label="Name"
                  name="name"
                  type="name"
                  placeholder="Your name"
                  value={Uname}
                  onChange={(e) => setUName(e.currentTarget.value)}
                />
                <TextInputGroup
                  label="country"
                  type="text"
                  name="country"
                  placeholder="Your country"
                  value={country}
                  onChange={(e) => setCountry(e.currentTarget.value)}
                />
                <TextInputGroup
                  label="Password"
                  type="password"
                  name="Password"
                  placeholder="Choose password"
                  value={password}
                  onChange={(e) => setPassWord(e.currentTarget.value)}
                />
                <TextInputGroup
                  label="Passwordagain"
                  type="password"
                  name="Passwordagain"
                  placeholder="Type password again"
                  value={passwordAgain}
                  onChange={(e) => setPassWordAgain(e.currentTarget.value)}
                />

                <button
                  className={style.button}
                  onClick={function (e) {
                    e.preventDefault();
                    setStep("4");
                  }}
                >
                  Next
                </button>
                <button
                  className={style.previous}
                  onClick={function (e) {
                    e.preventDefault();
                    setStep("2");
                  }}
                >
                  Previous step
                </button>
              </>
            )
          ) : (
            <>
              <h2 className={style.title}>What's your kind of dance?</h2>
              <div className={style.grid2 + " " + style.couple}>
                <button
                  onClick={function (e) {
                    e.preventDefault();
                    setDuo(false)
                  }}
                >
                  <img
                    alt="solo"
                    width="100%"
                    src="../../assets/img/signup/solo.svg"
                  ></img>
                </button>
                <button onClick={() => setDuo(true)}>
                  <img
                    alt="couple"
                    width="100%"
                    src="../../assets/img/signup/couple.svg"
                  ></img>
                </button>
              </div>
              {duo ? (
                <TextInputGroup
                  label="partner"
                  type="text"
                  name="partner"
                  placeholder="Partners name"
                  value={partner}
                  onChange={(e) => setPartner(e.currentTarget.value)}
                />
              ) : (
                ""
              )}
              {console.log(duo)}
              <button
                className={style.button}
                onClick={function (e) {
                  e.preventDefault();
                  setStep("3");
                }}
              >
                Next
              </button>
              <button
                className={style.previous}
                onClick={function (e) {
                  e.preventDefault();
                  setStep("1");
                }}
              >
                Previous step
              </button>
            </>
          )
        ) : (
          <>
            <h2 className={style.title}>Welcome</h2>
            <p className={style.error}>
              *This email address is already registered
            </p>
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <p className={style.smallText}>
              By continuing, you agree to uDance's{" "}
              <span className={style.terms_of_use}>Terms of Use</span>.
            </p>
            <button
              className={style.button}
              onClick={function (e) {
                e.preventDefault();
                setStep("2");
              }}
            >
              Next
            </button>
          </>
        )}
      </form>
    </div>
  ));
};

export default RegisterForm;
