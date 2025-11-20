import "../../index.css"
import "./CustomPlots.css"
import type { CustomPlotsProps } from "../../Constants";


// Table Component
function PlotTable({dataSet}: any){
    return (
        <>
       <div className="ctableContainer">
        {dataSet ? (
            <div className="ctable-wrapper">
                <table className="ctable">
                    <thead>
                    <tr className="ctable-header-row">
                        {dataSet.columns.map((col:any, idx:number) => (
                        <th key={idx} className="ctable-cell">{col}</th>
                        ))}
                    </tr>
                    </thead>
                    
                    <tbody>
                    {dataSet.data.map((row:any, rowIdx:number) => (
                        <tr key={rowIdx} className="ctable-row">
                        {dataSet.columns.map((col:any, colIdx:number) => (
                            <td key={colIdx} className="ctable-cell">{row[col]}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="empty-box">
                <p>This file has no data...</p>
            </div>
        )}
        </div>

        </>
    );
}



function CustomPlots({selectedPlot, dataSet}: CustomPlotsProps) {

    switch (selectedPlot) {
        case "Table":
            return <PlotTable dataSet={dataSet} />;
        default:
            return null;
    }

};

export default CustomPlots;
