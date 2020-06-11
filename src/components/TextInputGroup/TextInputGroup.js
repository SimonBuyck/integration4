import React from "react";

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
      <label htmlFor={name}>
        {label}
      </label>
      <input
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
