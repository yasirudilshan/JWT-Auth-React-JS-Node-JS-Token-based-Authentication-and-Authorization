import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Home from "./pages/Home";
import HomeComponent from "./components/HomeComponent";
import LoginRegisterComponent from "./components/LoginRegisterComponent";
import Msg from "./components/Msg";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact Component={Login} />
        <Route path="/Register" exact Component={Register} />
        <Route path="/Dashboard" exact Component={Dashboard} />
        <Route path="/about" exact Component={About} />
        <Route path="/" exact Component={Home} />
        <Route path="/signin" exact Component={LoginRegisterComponent} />
        <Route path="/msg" exact Component={Msg} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
