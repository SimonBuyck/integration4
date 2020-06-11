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
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoName, setVideoName] = useState("");

  const { uiStore, userStore } = useStore();
  const history = useHistory();

  const getVideoURL = async (e, file) => {
    e.preventDefault();
    setVideo(file);
    setVideoName(file.name);
    const uploadTask = firebase.storage().ref(`videos/${file.name}`).put(file);

    await uploadTask;
    const getURL = firebase
      .storage()
      .ref("videos/")
      .child(file.name)
      .getDownloadURL()
      .then((url) => setVideoURL(url));

    await getURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(video);
    if (password === passwordAgain) {
      const user = new User({
        name: Uname,
        email: email,
        store: userStore,
        password: password,
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
        <input
          type="file"
          accept="video/*"
          onChange={(e) => getVideoURL(e, e.target.files[0])}
        ></input>
        <video src={videoURL} width="200"></video>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
