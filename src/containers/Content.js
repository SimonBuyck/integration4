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
import { ROUTES } from "../consts";

const Content = () => {
  return (
    <section>
      <Switch>
        <Route exact path={ROUTES.home}>
          <Home />
          <Footer />
        </Route>
        <Route path={ROUTES.dances}>
          <Dances />
          <Footer />
        </Route>
        <Route path={ROUTES.profile}>
          <Profile />
          <Footer />
        </Route>

        <Route path={ROUTES.preview}>
          <Preview />
        </Route>

        <Route path={ROUTES.video}>
          <VideoStartButton />
        </Route>

        <Route path={ROUTES.swipe}>
          <Swipe />
        </Route>

        <Route path={ROUTES.videocss}>
          <Videocss />
        </Route>

        <Route path='/feedback'>
          <Feedback />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
