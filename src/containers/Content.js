import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoStartButton from "../components/VideoStartButton/Video";
import Swipe from "../components/Swipe/Swipe";

const Content = () => {
  return (
    <section>
      <Switch>
        <Route path="/video">
          <VideoStartButton />
        </Route>
        <Route path="/swipe">
          <Swipe />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
