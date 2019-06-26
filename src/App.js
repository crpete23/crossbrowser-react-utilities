import React from "react";
import "./App.css";

import { Table } from "./components";

const data = {
  1: {
    id: 1,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  2: {
    id: 2,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  3: {
    id: 3,
    name: "part3",
    type: "type3",
    material: "material3"
  }
};

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
