import React from "react";
import "./App.css";
import Mainpage from "./Comp/Mainpage";
import { Detail } from "./Comp/Detail";
import { ContextDataProvider } from "./Context/Context";


function App() {
  return (
    <div className="App">
      <ContextDataProvider>
        <Mainpage />
        <Detail />
      </ContextDataProvider>
    </div>
  );
}

export default App;
