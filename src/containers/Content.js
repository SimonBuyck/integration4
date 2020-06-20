import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoStartButton from "../components/VideoStartButton/Video";
import Swipe from "../components/Swipe/Swipe";
import Profile from "../components/Profile/ProfileCase";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Dances from "../components/Dances/Dances";

const Content = () => {
  return (
    <section>
    <Switch>
      <Route exact path="/">
        <Home />
        <Footer/>
      </Route>

      <Route path="/dances">
        <Dances />
        <Footer />
      </Route>

      <Route path="/profile">
        <Profile />
        <Footer />
      </Route>
    
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
  