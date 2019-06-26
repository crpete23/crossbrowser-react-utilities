import React from "react";
import "./table.css";

const Cell = ({ content, header }) => {
  return header ? (
    <th className="Cell Cell-header">{content}</th>
  ) : (
    <td className="Cell">{content}</td>
  );
};

export default Cell;
