import React, { Component } from "react";
import Cell from "./Cell";
import "./table.css";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellHeights: []
    };

    this.tableRef = React.createRef();

    this.initializeData();
  }

  componentDidMount() {
    this.handleCellHeightResize();
    //consider debouncing event listener, would need to adjust CWU
    window.addEventListener("resize", this.handleCellHeightResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleCellHeightResize);
  }

  dataKeysArr = [];
  headingsArr = [];
  dataRowsArr = [];

  initializeData = () => {
    //initialize table information if data has been passed in
    if (this.props.data) {
      this.dataKeysArr = Object.keys(this.props.data);
      if (this.dataKeysArr.length) {
        this.headingsArr = Object.keys(this.props.data[this.dataKeysArr[0]]);
        this.dataRowsArr = this.dataKeysArr.map((key, i) => {
          return Object.keys(this.props.data[key]).map(e => {
            return this.props.data[key][e];
          });
        });
      }
    }
  };

  /* Utilized as <headings>.map(this.renderHeadingRow)
   * Used within map function to return individual cells for heading
   */
  renderHeadingRow = (_cell, cellIndex) => {
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={this.headingsArr[cellIndex]}
        header={true}
        fixed={cellIndex === 0}
        height={this.state.cellHeights[0]}
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
              fixed={cellIndex === 0}
              height={this.state.cellHeights[rowIndex + 1]}
              greyed={rowIndex % 2 === 1 ? true : false}
            />
          );
        })}
      </tr>
    );
  };

  getTallestCellHeights = () => {
    const rows = [...this.tableRef.current.getElementsByTagName("tr")];
    let { heights } = this.state;

    heights = rows.map(row => {
      // reintroduce if fixed column height wraps, however causes bug where column size will not shrink
      //   const fixedCell = row.childNodes[0];
      //   return Math.max(row.clientHeight, fixedCell.clientHeight);
      return Math.max(row.clientHeight);
    });

    return heights;
  };

  handleCellHeightResize = () => {
    this.setState({ cellHeights: this.getTallestCellHeights() });
  };

  render() {
    const theadMarkup = (
      <tr key="heading">{this.headingsArr.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = this.dataRowsArr.map(this.renderRow);

    return (
      <div className="DataTable">
        <div className="TableCaption">{`${this.props.title}`}</div>
        <div className="ScrollContainer">
          <table className="Table" ref={this.tableRef}>
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
