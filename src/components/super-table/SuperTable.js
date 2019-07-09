import React, { useRef } from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import "react-table/react-table.css";

const renderNoTable = (hideTableMessage = "No data available") => (
  <div style={{ textAlign: "center" }}>
    <span className="item-heading greyText">{hideTableMessage}</span>
  </div>
);

const makePlaceholderFilter = (placeholder, { filter, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{
        width: "100%",
        boxShadow: filter && filter.value ? "inset 0px 0px 0px 2px #427ae9" : ""
      }}
      value={filter ? filter.value : ""}
      onChange={event => onChange(event.target.value)}
    />
  );
};

export const SuperTable = ({
  columns,
  data,
  hideTableMessage,
  isSearchable = true,
  filterRenderer,
  ...props
}) => {
  const tableRef = useRef(null);

  if ((!data || !data.length) && hideTableMessage) {
    return renderNoTable(hideTableMessage);
  }

  let columnsCopy = columns.map(col => {
    return {
      ...col,
      Filter: filterRenderer
        ? props => filterRenderer(props)
        : props => makePlaceholderFilter("Search...", props)
    };
  });
  if (tableRef.current) {
    // Resized array changes width in persistent ways that do not allow us to load saved configs
    tableRef.current.getResolvedState().resized.pop();
  }
  return (
    <ReactTable
      filterable={isSearchable}
      ref={tableRef}
      defaultFilterMethod={(filter, row) => {
        let colKey = filter.id;
        let query = filter.value;
        let data = row[colKey];
        return (
          matchSorter([data], query, {
            threshold: matchSorter.rankings.CONTAINS
          }).length > 0
        );
      }}
      className={"-highlight"}
      columns={columnsCopy}
      data={data}
      {...props}
    />
  );
};
