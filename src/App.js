import { HashRouter } from "react-router-dom";
import Routings from "./routes/Routings";
import React from "react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routings />
      </HashRouter>
    </div>
  );
}

export default App;
