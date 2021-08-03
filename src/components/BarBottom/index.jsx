import React from "react";
import { NavLink } from "react-router-dom";
import "./BarBottom.scss";

function BarBottom() {
  return (
    <div className="bar-bottom">
      <NavLink className="bar-bottom__link" to="/" exact activeClassName='is-active'>заметка</NavLink>
      <NavLink className="bar-bottom__link" to="/remainder" activeClassName='is-active'>напоминания</NavLink>
    </div>
  );
}

export default BarBottom;
