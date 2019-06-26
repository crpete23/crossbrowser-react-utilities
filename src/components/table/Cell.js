import React from "react";
import "./table.css";

const Cell = ({ content, header, fixed, height }) => {
  const classNameArr = () => {
    let classNames = ["Cell"];
    if (fixed) {
      classNames.push("Cell-fixed");
    }
    if (header) {
      classNames.push("Cell-header");
    }
    return classNames.join(" ");
  };

  const style = height && fixed ? { height: `${height}px` } : undefined;

  return header ? (
    <th scope="col" className={classNameArr()} style={style}>
      {content}
    </th>
  ) : fixed ? (
    // adds scope "row" to first cell of tbody row
    <th scope="row" className={classNameArr()} style={style}>
      {content}
    </th>
  ) : (
    <td className={classNameArr()} style={style}>
      {content}
    </td>
  );
};

export default Cell;
