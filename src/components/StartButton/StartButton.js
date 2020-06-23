import React from "react";
import style from "./StartButton.module.css";

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButton(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={style.button}
    >
      Join Video Call
    </button>
  );
}
