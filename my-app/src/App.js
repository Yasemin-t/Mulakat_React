import "./App.css";
import * as React from "react";
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import Login from "./components/Login";
import Otanim from "./components/Otanim";
import SeferTanim from "./components/SeferTanim";

function App() {
  const [token, setToken] = useState("");
  const [allBus, setAllBus] = useState([]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login setToken={setToken} />} />
        <Route
          path="/Otanim"
          element={<Otanim allBus={allBus} setAllBus={setAllBus} />}
        />
        <Route path="/SeferTanim" element={<SeferTanim />} />
        {/* <Route path="/Coin" element={<Coin />} /> */}
        <Route path="*" element={"404"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
