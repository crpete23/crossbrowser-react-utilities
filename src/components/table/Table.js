import React, { Component } from "react";
import Cell from "./Cell";
import "./table.css";

class Table extends Component {
  state = {};

  dataKeysArr = Object.keys(this.props.data);

  headingsArr = Object.keys(this.props.data[this.dataKeysArr[0]]);

  dataRowsArr = this.dataKeysArr.map((key, i) => {
    return Object.values(this.props.data[key]);
  });

  /* Utilized as <headings>.map(this.renderHeadingRow)
   * Used within map function to return individual cells for heading
   */
  renderHeadingRow = (_cell, cellIndex) => {
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={this.headingsArr[cellIndex]}
        header={true}
      />
    );
  };

  /* Utilized as <dataRows>.map(this.renderRow)
   * Used within map function to return individual data rows within table
   */
  renderRow = (_row, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {this.dataRowsArr[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={this.dataRowsArr[rowIndex][cellIndex]}
            />
          );
        })}
      </tr>
    );
  };

  render() {
    const theadMarkup = (
      <tr key="heading">{this.headingsArr.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = this.dataRowsArr.map(this.renderRow);

    return (
      <table className="Table">
        <thead>{theadMarkup}</thead>
        <tbody>{tbodyMarkup}</tbody>
      </table>
    );
  }
}

export default Table;
