import React from "react";
import "./App.css";

import { Table, SuperTable, TableContainer } from "./components";

import { data, columns } from "./data/mock-data";

function App() {
  return (
    <div className="app">
      <div className="grid-margin">grid</div>
      <div className="grid-playground-container">
        Test Area
        {/* <Table data={data} title="testing" /> */}
        {/* <SuperTable
          data={Object.keys(data).map(key => {
            return data[key];
          })}
          columns={columns}
        /> */}
        <TableContainer
          data={Object.keys(data).map(key => {
            return data[key];
          })}
          columns={columns}
        />
      </div>
      <div className="grid-margin">grid</div>
    </div>
  );
}

export default App;
