import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContractDetails from "./pages/ContractDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contract-details" element={<ContractDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;