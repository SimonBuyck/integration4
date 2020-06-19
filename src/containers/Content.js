import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoStartButton from "../components/VideoStartButton/Video";
import Swipe from "../components/Swipe/Swipe";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer"

const Content = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/">
        Homepage
          <Footer/>
        </Route>

        <Route path="/video">
          <VideoStartButton />
        </Route>

        <Route path="/swipe">
          <Swipe />
        </Route>

        <Route path="/profile">
          <Profile />
          <Footer />
        </Route>
        
      </Switch>
    </section>
  );
};

export default Content;
