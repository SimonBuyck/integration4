import React from "react";

export default function StartButton(props) {
  return (
    <button
      className="start-button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Click to join the call
    </button>
  );
}
