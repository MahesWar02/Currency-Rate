// src/App.js
import React from "react";
import CurrencyTable from "./components/CurrencyTable";

const App = () => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: "#FF8000",
      minHeight: "100vh",
      padding: "20px",
    }}
  >
    <h1 style={{ color: "white" }}>Display Rate Mata Uang</h1>
    <CurrencyTable />
  </div>
);

export default App;
