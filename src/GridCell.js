import React, { useState } from "react";

function GridCell({ cell }) {
  console.log(cell);

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
