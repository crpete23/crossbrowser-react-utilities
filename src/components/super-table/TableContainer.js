import React, { Component } from "react";

import { SuperTable } from "./SuperTable";
import "./TableContainer.css";

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.cleanColumns(this.props.columns),
      viewData: this.props.data
    };
  }

  //ensures columns have isActive and minWidth keys
  cleanColumns = columns => {
    return columns.map((col, i) => {
      let isActive = col.isActive !== undefined ? col.isActive : true;
      let width = col.width || 250;
      return {
        ...col,
        isActive,
        width
      };
    });
  };

  setViewDataState = viewData => this.setState({ viewData });

  render() {
    console.log(this.state.columns);
    const columnsInTable = this.state.columns.filter(col => !col.doNotShow);
    return (
      <div className="super-table-container">
        <div className="super-table-controls-container">
          <div className="super-table-controls-bar" />
        </div>
        <SuperTable
          {...this.props}
          setViewDataState={this.setViewDataState}
          showPaginationBottom
          columns={columnsInTable.filter(col => col.isActive && !col.doNotShow)}
        />
      </div>
    );
  }
}

export default TableContainer;
