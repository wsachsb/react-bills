import React from "react";
import Menu from "../Menu/Menu";
import "./Header.css";

const Header = ({ userResponse }) => {
  return (
    <header>
      <Menu userResponse={userResponse} />
    </header>
  );
};

export default Header;
