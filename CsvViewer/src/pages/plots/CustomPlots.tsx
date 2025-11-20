import "../../index.css"
import "./CustomPlots.css"
import { type CustomPlotsProps, colorList } from "../../Constants";
import { 
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, 
} from "recharts";



// Table Component
function PlotTable({ dataSet, selectedColumns }: { dataSet: any; selectedColumns?: string[] }) {
  // Defensive check
  if (!dataSet || !dataSet.columns || !dataSet.data) {
    return (
      <div className="empty-box">
        <p>This file has no data...</p>
      </div>
    );
  }

    const columnsToShow =
      selectedColumns && selectedColumns.length > 0
        ? selectedColumns
        : dataSet.columns
    ;

  return (
    <div className="ctableContainer">
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
            {dataSet.data.map((row: any, rowIdx: number) => (
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


function PlotBarChart({ dataSet, selectedArg, graphCount }: 
  { dataSet: any; selectedArg: string[]; graphCount: number }) {

  if (!selectedArg || selectedArg.length === 0) return <p>Please select variable(s) to plot</p>;

  const xKey = "Name";

  return (
    <div className="barGraph-container">
      {[...Array(graphCount)].map((_, i) => (
        <div key={i} className="graphBox">
          <BarChart responsive data={dataSet} 
          style={{ width: '100%', height:"100%", maxHeight: '100%', aspectRatio: 1.618 }}
          >
            <CartesianGrid strokeLinejoin="round" />
            <XAxis dataKey={xKey} />
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
      ))}
    </div>
  );
}


function PlotPieChart({ dataSet, selectedArg, graphCount }:
  { dataSet: any; selectedArg: string[]; graphCount: number }
  ){
  return(
    <div className="pieChart-container">
      <p>{dataSet} {selectedArg} {graphCount} </p>
    </div>
  );
}

function PlotLineGraph({ dataSet, selectedArg, graphCount }:
  { dataSet: any; selectedArg: string[]; graphCount: number }
  ){
  return(
    <div className="pieChart-container">
      <p>{dataSet} {selectedArg} {graphCount} </p>
    </div>
  );
}

function PlotHistogram({ dataSet, selectedArg, graphCount }:
  { dataSet: any; selectedArg: string[]; graphCount: number }
  ){
  return(
    <div className="pieChart-container">
      <p>{dataSet} {selectedArg} {graphCount} </p>
    </div>
  );
}

function PlotScatterChart({ dataSet, selectedArg, graphCount }:
  { dataSet: any; selectedArg: string[]; graphCount: number }
  ){
  return(
    <div className="pieChart-container">
      <p>{dataSet} {selectedArg} {graphCount} </p>
    </div>
  );
}

function PlotBoxChart({ dataSet, selectedArg, graphCount }:
  { dataSet: any; selectedArg: string[]; graphCount: number }
  ){
  return(
    <div className="pieChart-container">
      <p>{dataSet} {selectedArg} {graphCount} </p>
    </div>
  );
}




function CustomPlots({ dataSet, selectedColumns, selectedPlot="Table", graphCount=1 }: CustomPlotsProps) {
  if (!dataSet) return null;

  switch (selectedPlot) {
    case "Table":
      return <PlotTable dataSet={dataSet} selectedColumns={selectedColumns} />;
    case "Bar Chart":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotBarChart dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    case "Pie Chart":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotPieChart dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    case "Line Graph":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotLineGraph dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    case "Histogram":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotHistogram dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    case "Scatter Chart":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotScatterChart dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    case "Box Chart":
      if (!selectedColumns || selectedColumns.length === 0) return <p>Please select variables</p>;
      return <PlotBoxChart dataSet={dataSet.data} selectedArg={selectedColumns} graphCount={graphCount} />;
    default:
      return null;
  }
};

export default CustomPlots;
