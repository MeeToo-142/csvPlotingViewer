import "../../index.css";
import "./CustomPlots.css";
import { type CustomPlotsProps, colorList } from "../../Constants";
import {
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar,
} from "recharts";
import { Dropdown } from "../../components/dropdowns/DropDown";
import { useState } from "react";


// ---------------- TABLE ----------------
function PlotTable({ dataSet }: { dataSet: any; selectedColumns?: string[] }) {
  if (!dataSet || !dataSet.columns || !dataSet.data) {
    return (
      <div className="empty-box">
        <p>This file has no data...</p>
      </div>
    );
  }

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedRow, setSelectedRows] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const toggleDropdown = (id: string | null) => setOpen(id);

  const uniqueNames = [...new Set(
    dataSet.data.map((row: any) => row.Name)
  )] as (string | number)[];

  const columnsToShow =
    selectedColumns.length > 0 ? selectedColumns : dataSet.columns;

  const rowsToShow =
    selectedRow.length > 0
      ? dataSet.data.filter((row: any) => selectedRow.includes(row.Name))
      : dataSet.data;

  return (
    <div className="ctableContainer">
      <div className="actionbox-header">

        <Dropdown
          label="By Column"
          items={dataSet.columns}
          id="columns"
          openId={open}
          setOpenId={toggleDropdown}
          selectedItems={selectedColumns}
          setSelectedItems={setSelectedColumns}
          multiSelect={true}
        />

        <Dropdown
          label="By Row"
          items={uniqueNames}
          id="rows"
          openId={open}
          setOpenId={toggleDropdown}
          selectedItems={selectedRow}
          setSelectedItems={setSelectedRows}
          multiSelect={true}
        />
      </div>

      <div className="ctable-wrapper">
        <table className="ctable">
          <thead>
            <tr className="ctable-header-row">
              {columnsToShow.map((col: string, idx: number) => (
                <th key={idx} className="ctable-cell">{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowsToShow.map((row: any, rowIdx: number) => (
              <tr key={rowIdx} className="ctable-row">
                {columnsToShow.map((col: string, colIdx: number) => (
                  <td key={colIdx} className="ctable-cell">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ---------------- BAR CHART ----------------
function PlotBarChart({
  dataSet,
  selectedArg,
  graphCount
}: { dataSet: any; selectedArg: string[]; graphCount: number }) {

  if (selectedArg.length === 0) return <p>Please select variable(s) to plot</p>;

  const [open, setOpen] = useState<string | null>(null);
  const toggleDropdown = (id: string | null) => setOpen(id);

  return (
    <div className="barGraph-container">
      {[...Array(graphCount)].map((_, i) => (
        <div className="barGraph-box">
          <div className="barChart-header">

            <Dropdown
              label="Argument ( X )"
              items={Object.keys(dataSet[0] || {})}
              id="xarg"
              openId={open}
              setOpenId={toggleDropdown}
              selectedItems={[]}
              setSelectedItems={() => ""}
              multiSelect={false}
            />

            <Dropdown
              label="Argument ( Y )"
              items={Object.keys(dataSet[0] || {})}
              id="yarg"
              openId={open}
              setOpenId={toggleDropdown}
              selectedItems={[]}
              setSelectedItems={() => ""}
              multiSelect={false}
            />

            <Dropdown
              label="Item"
              items={Object.keys(dataSet[0] || {})}
              id="yarg"
              openId={open}
              setOpenId={toggleDropdown}
              selectedItems={[]}
              setSelectedItems={() => ""}
              multiSelect={false}
            />


          </div>

          <div key={i} className="graphBox">
            <BarChart width={600} height={400} data={dataSet}>
              <CartesianGrid />
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedArg.map((arg: string, index: number) => (
                <Bar
                  key={index}
                  dataKey={arg}
                  fill={colorList[index % colorList.length]}
                />
              ))}
            </BarChart>
          </div>
        </div>
      ))}
    </div>
  );
}


// --- Placeholder Components ---
function Placeholder(props: any) {
  return (
    <div className="pieChart-container">
      {[...Array(props.graphCount)].map((_, i) => (
        <p key={i}>{JSON.stringify(props)}</p>
      ))}
    </div>
  );
}


// ---------------- MAIN ROUTER ----------------
function CustomPlots({ dataSet, selectedPlot = "Table", selectedArg = [], graphCount = 1 }: CustomPlotsProps) {
  if (!dataSet) return null;

  switch (selectedPlot) {
    case "Table":
      return <PlotTable dataSet={dataSet} />;

    case "Bar Chart":
      if (selectedArg.length === 0) return <p>Please select variables</p>;
      return <PlotBarChart dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    case "Pie Chart":
      return <Placeholder dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    case "Line Graph":
      return <Placeholder dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    case "Histogram":
      return <Placeholder dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    case "Scatter Chart":
      return <Placeholder dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    case "Box Chart":
      return <Placeholder dataSet={dataSet.data} selectedArg={selectedArg} graphCount={graphCount} />;

    default:
      return null;
  }
}

export default CustomPlots;
