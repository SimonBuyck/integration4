import React, { useState } from "react";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextInputGroup from "../TextInputGroup/TextInputGroup";
import firebase from 'firebase';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null)

  const { uiStore, userStore } = useStore();
  const history = useHistory();

  const getVideoURL = async (e, videoFile) => {
    e.preventDefault();

    setVideo(videoFile);
    console.log(video);
    const uploadTask = firebase
      .storage()
      .ref(`videos/${video.name}`)
      .put(video);

    await uploadTask;
    firebase
      .storage()
      .ref("videos")
      .child(video.name)
      .getDownloadURL()
      .then((url) => setVideoURL(url));

    console.log(videoURL);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(video);
    if (password === passwordAgain) {
      const user = new User({
        name: name,
        email: email,
        store: userStore,
        password: password,
      });
      const result = await uiStore.registerUser(user);
      if (result.uid) {
        console.log(result);
        //gebruiker is correct geregistreerd
        history.push('/');
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
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
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
        <input type='file' accept='video/*' onChange={(e) => getVideoURL(e, e.target.files[0])}></input>
        <video src={videoURL} width='200'></video>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
