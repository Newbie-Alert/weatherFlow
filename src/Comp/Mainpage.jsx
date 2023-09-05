import React from "react";
import NavBar from "./NavBar";
import InfoSection from "./InfoSection";

function Mainpage() {
  return (
    <div className="main_container">
      <div className="bg_filter"></div>
      <NavBar />
      <InfoSection />
    </div>
  );
}

export default Mainpage;
