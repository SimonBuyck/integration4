import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoStartButton from "../components/VideoStartButton/Video";
import Swipe from "../components/Swipe/Swipe";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Dances from "../components/Dances/Dances";
import Profile from "../components/Profile/Profile";
import Preview from "../components/Preview/Preview";
import Videocss from "../components/Videocss/Videocss";
import Feedback from "../components/Feedback/Feedback";

const Content = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/">
          <Home />
          <Footer />
        </Route>
        <Route path="/dances">
          <Dances />
          <Footer />
        </Route>

        <Route path="/profile">
          <Profile />
          <Footer />
        </Route>

        <Route path="/preview">
          <Preview />
        </Route>

        <Route path="/video">
          <VideoStartButton />
        </Route>

        <Route path="/swipe">
          <Swipe />
        </Route>

        <Route path="/videocss">
          <Videocss />
        </Route>

        <Route path="/feedback">
          <Feedback />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
