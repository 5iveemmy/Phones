import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import Cards from "./components/Cards";
import Interface from "./components/Interface";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Router>
        <Interface />
        <Sidebar />
        {/* <Cards /> */}
      </Router>
    </>
  );
}

export default App;
