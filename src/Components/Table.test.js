import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableWrapper from "./Table";

describe("TableWrapper Component", () => {
  const columns = [
    { name: "Name", key: "name", sortable: true },
    { name: "Device", key: "device", sortable: true },
    { name: "Path", key: "path", sortable: true },
    { name: "Status", key: "status", sortable: true },
  ];

  const rows = [
    {
      id: 1,
      name: "File1",
      device: "Device1",
      path: "/path1",
      status: "available",
    },
    {
      id: 2,
      name: "File2",
      device: "Device2",
      path: "/path2",
      status: "unavailable",
    },
  ];

  test("renders without crashing", () => {
    render(<TableWrapper columns={columns} rows={rows} selectRow />);
  });

  test("returns null when columns array is empty", () => {
    const { container } = render(
      <TableWrapper columns={[]} rows={rows} selectRow />
    );
    expect(container.firstChild).toBeNull();
  });

  test("displays 'No data to display' when there are no rows", () => {
    render(<TableWrapper columns={columns} rows={[]} selectRow />);
    const trElement = screen.getByText("No data to display");
    expect(trElement).toBeInTheDocument();
  });

  test("renders the correct number of columns", () => {
    render(<TableWrapper columns={columns} rows={rows} />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length);
  });

  test("selects all rows when select all checkbox is checked", () => {
    render(<TableWrapper columns={columns} rows={rows} selectRow />);
    fireEvent.click(screen.getByTestId("Select All"));
    expect(screen.getAllByTestId("Select Row")).toHaveLength(rows.length);
  });
});
