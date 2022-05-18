import React from "react";
interface InputProps {
  id: string;
  name: string;
  value: string;
  label: string;
}
const Input = ({ label, name, value, id }: InputProps) => {
  return (
    <div className="form__group">
      <label htmlFor="email" className="form__label">
        {label}
      </label>
      <input
        type="text"
        className="form__input"
        id={id}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
