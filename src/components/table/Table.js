import React, { Component } from "react";
import Cell from "./Cell";
import PageRouter from "./PageRouter";
import "./table.css";

const _ = require("lodash");

class Table extends Component {
  constructor(props) {
    super(props);

    let keys = [];
    if (this.props.data) {
      keys = Object.keys(this.props.data);
    }
    let minRange = keys.length ? 1 : 0;
    let maxRange = keys.length ? (keys.length > 9 ? 10 : keys.length) : 0;

    this.state = {
      pagination: 10,
      data: this.props.data || {},
      headings: this.getHeadings(this.props.data),
      currentRows: this.getRows(this.props.data, minRange, maxRange),
      minRange: minRange,
      maxRange: maxRange,
      dataRange: keys.length,
      cellHeights: []
    };

    this.tableRef = React.createRef();
  }

  componentDidMount() {
    //initialize cell heights in state
    this.handleCellHeightResize();
    window.addEventListener(
      "resize",
      _.debounce(this.handleCellHeightResize, 100)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.currentRows, this.state.currentRows)) {
      this.handleCellHeightResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      _.debounce(this.handleCellHeightResize, 100)
    );
  }

  getCurrentDataKeys = (data, minRange, maxRange) => {
    if (!data) {
      return [];
    }
    return Object.keys(data).slice(minRange - 1, maxRange);
  };

  getRows = (data, minRange, maxRange) => {
    if (!data) {
      return [];
    }
    let keys = this.getCurrentDataKeys(data, minRange, maxRange);
    return keys.map((key, i) => {
      return Object.keys(data[key]).map(e => {
        return data[key][e];
      });
    });
  };

  getHeadings = data => {
    if (!data) {
      return [];
    }
    let templateKey = Object.keys(data)[0];
    return Object.keys(data[templateKey]);
  };

  /* Utilized as <headings>.map(this.renderHeadingRow)
   * Used within map function to return individual cells for heading
   */
  renderHeadingRow = (_cell, cellIndex) => {
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={this.state.headings[cellIndex]}
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
        {this.state.currentRows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={this.state.currentRows[rowIndex][cellIndex]}
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

  updateRange = newMin => {
    if (newMin > this.state.dataRange || newMin < 1) {
      return;
    }
    let max = Math.min(newMin + 9, this.state.dataRange);
    this.setState({
      minRange: newMin,
      maxRange: max,
      currentRows: this.getRows(this.props.data, newMin, max)
    });
  };

  render() {
    console.log("rendering");

    console.log(this.state.minRange, this.state.maxRange);

    const theadMarkup = (
      <tr key="heading">{this.state.headings.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = this.state.currentRows.map(this.renderRow);

    return (
      <div className="DataTable">
        <div className="TableCaption">{`${this.props.title}`}</div>
        <div className="ScrollContainer">
          <table className="Table" ref={this.tableRef}>
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
        </div>
        <div className="TableFooter">
          <div className="TableRange">{`Showing ${this.state.minRange} to ${
            this.state.maxRange
          } of ${this.state.dataRange} entries`}</div>
          <div className="PageRouterContainer">
            <PageRouter
              pagination={this.state.pagination}
              minRange={this.state.minRange}
              maxRange={this.state.maxRange}
              dataRange={this.state.dataRange}
              updateRange={this.updateRange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
