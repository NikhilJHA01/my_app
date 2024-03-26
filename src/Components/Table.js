import React, { useState } from "react";
import styles from "./Table.module.css";

const TableWrapper = ({ columns, rows, selectRow }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const isSomeSelected =
    selectedRows.length > 0 && selectedRows.length < rows.length;

  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows = [];
    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, id];
    } else {
      newSelectedRows = selectedRows.filter((row) => row !== id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      // Deselect all rows if all are currently selected
      setSelectedRows([]);
    } else {
      // Select all rows if not all are currently selected
      const allIds = rows.map((row) => row.id);
      setSelectedRows(allIds);
    }
  };

  const handleDownload = () => {
    // Get the selected rows with status as available
    const downloadRows = rows.filter(
      (row) => selectedRows.includes(row.id) && row.status === "available"
    );

    // Generate the message for the alert box
    // ** Messages can be kept in translation files
    let message = "Selected Rows with Status as Available\n\n";
    if (downloadRows.length) {
      downloadRows.forEach((row) => {
        message += `Device: ${row.device}\nPath: ${row.path}\n\n`;
      });
      alert(message);
    } else {
      alert("No Rows Available to be downloaded");
    }
  };

  if (columns.length === 0) return null;

  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          {selectRow && (
            <tr>
              <th colSpan={columns.length + 1}>
                <div className={styles["selection-info"]}>
                  <span>
                    {selectedRows.length
                      ? `Selected ${selectedRows.length}`
                      : "None Selected"}
                  </span>
                  <button onClick={() => handleDownload()}>
                    ⬇ Download Selected
                  </button>
                </div>
              </th>
            </tr>
          )}
          <tr>
            {selectRow && (
              <th>
                <input
                  data-testid="Select All"
                  id="selectAll"
                  name="Select All"
                  type="checkbox"
                  aria-checked={
                    selectedRows.length === rows.length && rows.length > 0
                      ? "true"
                      : "false"
                  }
                  checked={
                    selectedRows.length === rows.length && rows.length > 0
                  }
                  onChange={handleSelectAll}
                  // Set indeterminate state if some rows are selected
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = isSomeSelected;
                    }
                  }}
                />
                <label htmlFor="selectAll">Select All</label>
              </th>
            )}
            {columns.map((column) => (
              <th key={column.key} style={column.headerStyle}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr
                key={row.id}
                className={
                  selectRow && selectedRows.includes(row.id)
                    ? styles["selected-row"]
                    : ""
                }
              >
                {selectRow && (
                  <td>
                    <input
                      data-testid="Select Row"
                      id={`selectRow${index}`}
                      aria-checked={
                        selectedRows.includes(row.id) ? "true" : "false"
                      }
                      aria-label={`selectRow${index}`}
                      name={`Select Row ${index}`}
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} style={column.cellStyle}>
                    {column.condition && column.condition(row) && (
                      <span style={column.customStyles} />
                    )}
                    <span>{row[column.key]}</span>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td>No data to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
