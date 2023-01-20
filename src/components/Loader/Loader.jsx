import React from "react";
import "./Loader.css";
import { RiLoader2Fill } from "react-icons/ri";

const Loader = ({ loadingName }) => {
  return (
    <div className="loader__container">
      <div className="loading__wrapper">
        <i className="loader__icon">
          <RiLoader2Fill />
        </i>
        <h4>{loadingName}..!!</h4>
      </div>
    </div>
  );
};

export default Loader;
