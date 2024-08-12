import React from "react";
import logo from "../images/logo.png";

const Header = () => {
    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
            <img src={logo} alt="logo" className="w-44" />
        </div>
    );
};

export default Header;
