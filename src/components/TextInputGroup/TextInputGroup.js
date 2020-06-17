import React from "react";
import style from "./TextInputGroup.module.css";

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <>
      <label className={style.hidden} htmlFor={name}>
        {label}
      </label>
      <input className={style.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required="required"
        autoComplete="off"
      />
    </>
  );
};

export default TextInputGroup;
