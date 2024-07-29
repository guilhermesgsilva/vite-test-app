import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, IRowNode } from "ag-grid-community";
/* import MyCellComponent from "./components/MyCellComponent"; */
import data from "./data/data.json";
import { Car } from "./App.types";

const App: React.FC = () => {
  const gridRef = useRef<AgGridReact<Car>>(null);

  /* useEffect(() => {}, []); */

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<Car[]>(data.data);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "make",
      /* cellRenderer: MyCellComponent, */
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Tesla",
          "Ford",
          "Toyota",
          "Mercedes",
          "Fiat",
          "Nissan",
          "Vauxhall",
          "Volvo",
          "Jaguar",
        ],
      },
      checkboxSelection: true,
    },
    { field: "model" },
    {
      headerName: "Make & Model",
      valueGetter: (p) => p.data.make + " " + p.data.model,
    },
    { field: "price", valueFormatter: (p) => p.value + " €" },
    { field: "electric" },
    {
      field: "month",
      comparator: (valueA: string, valueB: string) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const idxA = months.indexOf(valueA);
        const idxB = months.indexOf(valueB);
        return idxA - idxB;
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
      editable: true,
    };
  }, []);

  return (
    <>
      {/* wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </>
  );
};

export default App;
