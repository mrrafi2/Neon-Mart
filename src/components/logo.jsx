import React from "react";
import { Link } from "react-router-dom";
import img from "./image/logo.jfif";
import classes from "./style/logo.module.css"; 

const Logo = () => {
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <img src={img} alt="Logo" className={classes.logoImg} />
      </Link>
    
    </div>
  );
};

export default Logo;