import React from "react";

import "./App.css";
import Routes from "./Routes";
import NavBar from "./Components/Shared/NavBar.js";
import Footer from "./Components/Shared/Footer.js";

function App() {
  return (
    <div className="conta">
      <NavBar />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
