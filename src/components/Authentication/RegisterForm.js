import React, { useState } from "react";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import firebase from "firebase";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [Uname, setUName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");
  const [videoSource, setVideoSource] = useState(null);
  const [video, setVideo] = useState("");
  const [dance, setDance] = useState("");
  const [country, setCountry] = useState("");
  const [duo, setDuo] = useState("");
  const [partner, setPartner] = useState("");

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
    setVideo(`${file.name}`);
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
        video: video,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="Name"
          name="name"
          type="name"
          placeholder="Fill in your name."
          value={Uname}
          onChange={(e) => setUName(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Fill in your email."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          type="password"
          name="Password"
          placeholder="Fill in your password."
          value={password}
          onChange={(e) => setPassWord(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Passwordagain"
          type="password"
          name="Passwordagain"
          placeholder="Fill in your password again."
          value={passwordAgain}
          onChange={(e) => setPassWordAgain(e.currentTarget.value)}
        />
        <TextInputGroup
          label="country"
          type="text"
          name="country"
          placeholder="Fill in your country."
          value={country}
          onChange={(e) => setCountry(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Dance"
          type="text"
          name="dance"
          placeholder="Fill in your dance."
          value={dance}
          onChange={(e) => setDance(e.currentTarget.value)}
        />
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
          duo
          <input
            label="partner"
            type="text"
            name="partner"
            placeholder="partners name."
            value={partner}
            onChange={(e) => setPartner(e.currentTarget.value)}
          />
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => getVideoURL(e, e.target.files[0])}
        ></input>
        <video src={videoSource} width="200" autoPlay></video>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
