import React, {useState} from "react";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import bgDark from "../assets/images/bg-desktop-dark.jpg";
import bgLight from "../assets/images/bg-desktop-light.jpg";

const Header = () => {
  // state
  let [icon, setIcon] = useState(moon);
  let [bg, setbg] = useState(bgLight);

  // events
  const darkMode = () => {
    document.body.classList.toggle("dark-scheme");
    document.body.style.transition = "all .3s linear";
    if (document.body.className.includes("dark-scheme")) {
      setbg(bgDark);
      setIcon(sun);
    } else {
      setbg(bgLight);
      setIcon(moon);
    }
  };

  return (
    <>
      <img src={bg} className="bg-image" alt="" />
      <div className="header">
        <h1>TODO</h1>
        {/* <i className={icon} onClick={darkMode}></i> */}
        <img src={icon} className="darkmode-icon" onClick={darkMode} alt="" />
      </div>
    </>
  );
};

export default Header;
