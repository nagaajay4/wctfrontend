import { BrowserRouter, HashRouter } from "react-router-dom";
import Routings from "./routes/Routings";
import React from "react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routings />
      </BrowserRouter>
    </div>
  );
}

export default App;
