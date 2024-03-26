import "./App.css";
import TableWrapper from "./Components/Table";
import { columns, rows } from "./data";

function App() {
  return (
    <main className="App">
      <TableWrapper columns={columns} rows={rows} selectRow={true} />
    </main>
  );
}

export default App;
