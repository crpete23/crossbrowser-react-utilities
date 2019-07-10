import React, { /*Fragment,*/ useRef } from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import "react-table/react-table.css";
// import { Waypoint } from "react-waypoint";

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

// const handleTableEvent = (setViewDataState, tableRef) => {
//     let newData = tableRef.current.getResolvedState().sortedData;
//     // Apply ids to view data when deriving from getResolvedState
//     newData = newData.map(datum => {
//       return { ...datum, id: datum._original.id };
//     });
//     return setViewDataState(newData);
//   };

export const SuperTable = ({
  columns,
  data,
  hideTableMessage,
  isSearchable = true,
  filterRenderer,
  //   setViewDataState,
  ...props
}) => {
  const tableRef = useRef(null);

  //   // When data changes, we can infer that either a filter has been applied
  //   // and we need to ensure that we preserve the sort and search criteria
  //   useEffect(() => {
  //     handleTableEvent(setViewDataState, tableRef);
  //   }, [data]);

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
    // <Fragment>
    <ReactTable
      // filterable={isSearchable}
      ref={tableRef}
      // defaultFilterMethod={(filter, row) => {
      //   let colKey = filter.id;
      //   let query = filter.value;
      //   let data = row[colKey];
      //   return (
      //     matchSorter([data], query, {
      //       threshold: matchSorter.rankings.CONTAINS
      //     }).length > 0
      //   );
      // }}
      //   onSortedChange={newSorted => handleTableEvent(setViewDataState, tableRef)}
      //   onFilteredChange={filtered =>
      //     handleTableEvent(setViewDataState, tableRef)
      //   }
      className={"-highlight"}
      showPagination={false}
      defaultPageSize={5}
      columns={columnsCopy}
      data={data}
      {...props}
    />
    //  <Waypoint
    //     onEnter={() => handleWaypointEnter()}
    //     onLeave={() => handleWaypointLeave()}
    //   />
    // </Fragment>
  );
};

// const handleWaypointEnter = () => {
//   console.log("entering");
// };

// const handleWaypointLeave = () => {
//   console.log("leaving");
// };
