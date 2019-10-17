import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { errorColor } from "../styles";

const inputErrorStyle = {
  border: "solid 1px " + errorColor
};

const errorStyle = {
  color: errorColor,
  fontWeight: "bold"
};

function Input(props) {
  const input = props.type === 'day'
    ? <DayPickerInput
        id={props.id}
        name={props.name}
        style={props.error ? inputErrorStyle: null}
        onDayChange={props.onChange}
        value={props.value}
      />
    : <input
        id={props.id}
        name={props.name}
        type={props.type}
        style={props.error ? inputErrorStyle : null}
        onChange={props.onChange}
        value={props.value}
      />;
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      {input}
      {props.error && (
        <p role="alert" style={errorStyle}>
          {props.error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "phone", "number", "time", "day"]),
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
