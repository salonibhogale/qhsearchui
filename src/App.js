import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./Components/Shared/NavBar.js";
import Footer from "./Components/Shared/Footer.js";

function App() {
  return (
    <div className="cont">
      <NavBar />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
