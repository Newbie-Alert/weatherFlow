import React, { useState, useEffect } from "react";

// Variables
const today = new Date();
const months = [
  "jan",
  "feb",
  "march",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Tursday",
  "Friday",
  "Saturday",
];
const dayInfo = {
  date: `${days[today.getDay()]}, ${today.getDate()} ${
    months[today.getUTCMonth() + 1]
  } ${today.getFullYear()}`,
};

function NavBar() {
  const [clock, setClock] = useState("");
  const [time, setTime] = useState("");

  function getClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setClock(`${hours}:${minutes}`);
    setTime((clock) => (clock.slice(0, 2) >= "12" ? "PM" : "AM"));
  }

  // start GetTime
  useEffect(() => {
    getClock();
  }, []);
  // Update Time
  setInterval(getClock, 1000);

  return (
    <>
      <nav className="nav_container container">
        <h1 className="logo">weatherFlow.</h1>
        <div className="today_info">
          <h2>
            {clock} {time}
          </h2>
          <p>{dayInfo.date}</p>
        </div>
        <div></div>
      </nav>
    </>
  );
}

export default NavBar;
