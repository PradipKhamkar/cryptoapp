import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="loader__container">
      <div className="loading__wrapper">
        <i className="loader__icon">
          <RiLoader2Fill />
        </i>
        <h4>Page Is Not Found..!!</h4>
      </div>
    </div>
  );
};

export default NotFound;
