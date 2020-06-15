import React, { useContext, useEffect, useState } from "react";
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_LEAVE,
} from "../TrayButton/TrayButton";
import CallObjectContext from "../../CallObjectContext";
import { logDailyEvent } from "../../logUtils";

/**
 * Gets [isCameraMuted, isMicMuted, isSharingScreen].
 * This function is declared outside Tray() so it's not recreated every render
 * (which would require us to declare it as a useEffect dependency).
 */
function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
  }
  return [isCameraMuted, isMicMuted];
}

/**
 * Props:
 * - onClickLeaveCall: () => ()
 * - disabled: boolean
 */
export default function Tray(props) {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  function leaveCall() {
    props.onClickLeaveCall && props.onClickLeaveCall();


    // deletes teh room after leaving
    // var data = null;

    // var xhr = new XMLHttpRequest();

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("DELETE", "https://api.daily.co/v1/rooms/pipi");
    // xhr.setRequestHeader(
    //   "authorization",
    //   "Bearer 38b978f11062e181895d8369b3a8b2b21f486a0e49a0f6fb119954f797b6a3e9"
    // );

    // xhr.send(data);
  }

  /**
   * Start listening for participant changes when callObject is set (i.e. when the component mounts).
   * This event will capture any changes to your audio/video mute state.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event);
      const [isCameraMuted, isMicMuted] = getStreamStates(
        callObject
      );
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on("participant-updated", handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <div className="tray">
      <TrayButton
        type={TYPE_MUTE_CAMERA}
        disabled={props.disabled}
        highlighted={isCameraMuted}
        onClick={toggleCamera}
      />
      <TrayButton
        type={TYPE_MUTE_MIC}
        disabled={props.disabled}
        highlighted={isMicMuted}
        onClick={toggleMic}
      />
      <TrayButton
        type={TYPE_LEAVE}
        disabled={props.disabled}
        newButtonGroup={true}
        highlighted={true}
        onClick={leaveCall}
      />
    </div>
  );
}
