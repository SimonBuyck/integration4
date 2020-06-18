import React, { useState } from "react";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import firebase from "firebase";
import style from "./Authentication.module.css";
import { useObserver } from "mobx-react-lite";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [Uname, setUName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");
  const [videoSource, setVideoSource] = useState(null);
  const [dance, setDance] = useState("");
  const [country, setCountry] = useState("");
  const [duo, setDuo] = useState("");
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

  return useObserver(() => (
    <div>
      <form onSubmit={handleSubmit}>
        {step !== "1" ? (
          step !== "2" ? (
            step !== "3" ? (
              <>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => getVideoURL(e, e.target.files[0])}
                ></input>
                <video src={videoSource} width="200" autoPlay></video>
                <input type="submit" value="Register" />
              </>
            ) : (
              <>
                <TextInputGroup
                  label="Name"
                  name="name"
                  type="name"
                  placeholder="Your name"
                  value={Uname}
                  onChange={(e) => setUName(e.currentTarget.value)}
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
                <TextInputGroup
                  label="country"
                  type="text"
                  name="country"
                  placeholder="Your country"
                  value={country}
                  onChange={(e) => setCountry(e.currentTarget.value)}
                />
                <button onClick={(e) => setStep("4")}>next</button>
              </>
            )
          ) : (
            <>
              <div>
                <TextInputGroup
                  label="Dance"
                  type="text"
                  name="dance"
                  placeholder="Dance name"
                  value={dance}
                  onChange={(e) => setDance(e.currentTarget.value)}
                />
              </div>
              <label>
                duo
                <input
                  label="duo"
                  type="checkbox"
                  name="duo"
                  placeholder="check for duo."
                  value={duo}
                  onChange={(e) => setDuo(e.currentTarget.value)}
                />
              </label>
              <label>
                <TextInputGroup //Dit is aangepast van input naar TextInputGroup
                  label="partner"
                  type="text"
                  name="partner"
                  placeholder="Partners name"
                  value={partner}
                  onChange={(e) => setPartner(e.currentTarget.value)}
                />
              </label>
              <button onClick={(e) => setStep("3")}>next</button>
            </>
          )
        ) : (
          <>
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
            <button onClick={(e) => setStep("2")}>next</button>
          </>
        )}
      </form>
    </div>
  ));
};

export default RegisterForm;
