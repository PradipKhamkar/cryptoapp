import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

const Error = () => {
  return (
    <div className="loader__container">
      <div className="loading__wrapper">
        <i className="loader__icon">
          <RiLoader2Fill />
        </i>
        <h4>Something Wrong..!!</h4>
      </div>
    </div>
  );
};

export default Error;
