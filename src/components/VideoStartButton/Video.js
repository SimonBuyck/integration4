import React, { useEffect, useState, useCallback } from "react";
import Call from "../Call/Call";
import StartButton from "../StartButton/StartButton";
import api from "../../api";
import Tray from "../Tray/Tray";
import CallObjectContext from "../../CallObjectContext";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../urlUtils";
import DailyIframe from "@daily-co/daily-js";
import { logDailyEvent } from "../../logUtils";
import { useStore } from "../../hooks/useStore";
import style from "./Video.module.css";

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";

export default function VideoStartButton({ match }) {
  const { matchStore } = useStore();

  const roomUrlMatch = match.roomUrl;

  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom()
      .then((room) => room.url)
      .catch((error) => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, []);

  const startJoiningCall = useCallback((url) => {
    console.log('joining call: ', url);
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);

  const setMatchUrl = useCallback((url) => {
    setAppState(STATE_IDLE);
    match.roomUrl = url;
    matchStore.updateMatch(match);
    console.log('url created: ', url)
  }, [match, matchStore]);

  const startLeavingCall = useCallback(
    (roomUrlMatch) => {
      if (!callObject) return;
      setAppState(STATE_LEAVING);
      callObject.leave();
      api.deleteRoom(roomUrlMatch);
    },
    [callObject]
  );

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    appState
  );

  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

  const enableStartButton = appState === STATE_IDLE;

  return (
    <div className={style.main}>
      {showCall ? (
        <CallObjectContext.Provider value={callObject}>
          <Call roomUrl={roomUrl} />
          <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={() => startLeavingCall(roomUrlMatch)}
          />
        </CallObjectContext.Provider>
      ) : (
        <StartButton
          disabled={!enableStartButton}
          onClick={() => {
            if (roomUrlMatch) {
              startJoiningCall(roomUrlMatch);
            } else {
              createCall().then((url) => setMatchUrl(url));
            }
          }}
        />
      )}
    </div>
  );
}
