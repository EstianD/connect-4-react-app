import React from "react";
import GridCell from "./GridCell";

function GridColumn({ column, handlePlaceToken, grid, columnKey }) {
  let columnArray = [];

  for (let row = column.length - 1; row >= 0; row--) {
    columnArray.push(<GridCell key={row} cell={column[row]} />);
  }

  return (
    <div className="grid-column" onClick={() => handlePlaceToken(columnKey)}>
      {columnArray}
    </div>
  );
}

export default GridColumn;
