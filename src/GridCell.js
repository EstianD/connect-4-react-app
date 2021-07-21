import React from "react";

function GridCell({ cell }) {
  let cellColor = "";

  if (cell === "1") {
    cellColor = "green";
  }

  if (cell === "2") {
    cellColor = "blue";
  }

  return (
    <div className="grid-cell" style={{ backgroundColor: cellColor }}></div>
  );
}

export default GridCell;
