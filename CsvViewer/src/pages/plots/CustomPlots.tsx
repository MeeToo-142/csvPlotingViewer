import "../../index.css"
import "./CustomPlots.css"
import type { CustomPlotsProps } from "../../Constants";


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


function CustomPlots({ selectedPlot, dataSet, selectedColumns }: CustomPlotsProps) {
  if (!dataSet) return null;

  switch (selectedPlot) {
    case "Table":
      return <PlotTable dataSet={dataSet} selectedColumns={selectedColumns} />;
    default:
      return null;
  }
};

export default CustomPlots;
