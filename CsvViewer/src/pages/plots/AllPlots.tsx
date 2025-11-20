import { useSearchParams } from "react-router-dom";
import { PageRoutes, PlotTypes, Porxy, type CsvData } from "../../Constants";
import { useEffect, useState } from "react";
import "../../index.css"
import "./AllPlots.css"
import CustomPlots from "./CustomPlots";

function AllPlots() {

  const [searchParams] = useSearchParams();

  const fileId = searchParams.get("id");
  const fileName = searchParams.get("filename");

  const [metaData, setMetaData] = useState<any[]>([]);
  const [fetchedData, setFetchedData] = useState<CsvData | null>(null);
  const [open, setOpen] = useState(null);

  const toggle = (name: any) => {
    setOpen(open === name ? null : name);
  };


  // mainData of CSV File
  useEffect(() => {
    const fetchData = async () => {
        if (!fileId || !fileName) return;

        try {
            const response = await fetch(`${Porxy}/view-plots?id=${fileId}&filename=${fileName}`);
            if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);
            
            const data = await response.json();
            setFetchedData(data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchData();
  }, [fileId, fileName]);

  // metaData of Upload Inputs
  useEffect(() => {
    const localData = localStorage.getItem("uploadedFiles");
    if (!localData) return;
    setMetaData(JSON.parse(localData));
  }, []);


  function formatTimestamp(isoString: string) {
    const date = new Date(isoString);

    const optionsDate: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} at ${formattedTime}`;
  }


  if (!fetchedData) return <p>Loading data...</p>;

  return (
    <div className="allplots-container" >
      <div className="allplots-header">
        <a href={PageRoutes.homepage.path}>BACK</a>
      </div>

      <div className="allplots-body">

        <div className="allplots-leftcon">

          <div className="plots-actionsbox">
            <div className={`plotselection-box ${open === "variable" ? "open" : ""}`} >
              <button className="dropdown-boxbtn" onClick={() => toggle("variable")}>Variable</button>
              <div className="dropdown-itemsbox">
                {fetchedData?.columns.map((col, index) => (
                  <p key={index}>{col}</p>
                ))}
              </div>
            </div>
            <div className={`plotselection-box ${open === "plot" ? "open" : ""}`} >
              <button className="dropdown-boxbtn" onClick={() => toggle("plot")}>Plot</button>
              <div className="dropdown-itemsbox">
                {PlotTypes.map((plot, index) => (
                  <p key={index}>{plot}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="plots-areabox">
              <CustomPlots selectedPlot={"Table"} dataSet={fetchedData} />
              <p>{fetchedData.columns.length}</p>
          </div>
          <p className="infotxt">Plots Name | {fetchedData? `${fetchedData.data.length > 1 ? "Items" : "Item"}: ${fetchedData.data.length}`: "Loading..."}</p>
        </div>

        <div className="allplots-rightcon">
          <div className="infoMeta">
            <h1>Meta Data</h1>

            {metaData.map((item, index) => (
            <div key={index} className="metaInfoBox">
              <p>{item.fileName}</p>
              <p>{formatTimestamp(item.date)}</p>
              <p>{item.author}</p>
            </div>
            ))}
            
          </div>

          <div className="csvfiledata-infobox">
            <h3>CSV Insights</h3>
            <div className="infoData">
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
            </div>

            <div className="otheractions">
              <button>Download CSV</button>
              <button>CSV to Json</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default AllPlots;