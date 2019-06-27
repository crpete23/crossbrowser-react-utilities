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
  },
  11: {
    id: 4,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  12: {
    id: 5,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  13: {
    id: 6,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  21: {
    id: 7,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  22: {
    id: 8,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  23: {
    id: 9,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  31: {
    id: 10,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  32: {
    id: 11,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  33: {
    id: 12,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  41: {
    id: 13,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  42: {
    id: 14,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  43: {
    id: 15,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  51: {
    id: 7,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  52: {
    id: 8,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  53: {
    id: 9,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  61: {
    id: 10,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  62: {
    id: 11,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  63: {
    id: 12,
    name: "part3",
    type: "type3",
    material: "material3"
  },
  71: {
    id: 13,
    name: "part1",
    type: "type1",
    material:
      "material1 helo my name is chris and this is going to be a long div"
  },
  72: {
    id: 14,
    name: "part2",
    type: "type2",
    material: "material2"
  },
  73: {
    id: 15,
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
