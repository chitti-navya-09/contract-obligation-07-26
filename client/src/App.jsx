import React from "react";
import { Routes, Route } from "react-router-dom";
import ContractRepository from "./pages/ContractRepository/ContractRepository";
import ContractDetails from "./pages/ContractDetails/ContractDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContractRepository />} />
      <Route
        path="/contract-details"
        element={<ContractDetails />}
      />
    </Routes>
  );
}

export default App;