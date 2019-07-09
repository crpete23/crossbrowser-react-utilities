import React from "react";
import "./App.css";

import { Table } from "./components";

import { data } from "./data/mock-data";

function App() {
  return (
    <div className="app">
      <div className="grid-margin">grid</div>
      <div className="grid-playground-container">
        Test Area
        <Table data={data} title="testing" />
      </div>
      <div className="grid-margin">grid</div>
    </div>
  );
}

export default App;
