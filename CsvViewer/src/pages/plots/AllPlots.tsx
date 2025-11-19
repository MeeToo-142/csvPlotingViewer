import { useSearchParams } from "react-router-dom";
import { PageRoutes, Porxy } from "../../Constants";
import { useEffect, useState } from "react";
import "../../index.css"
import "./AllPlots.css"

function AllPlots() {

  const [searchParams] = useSearchParams();

  const fileId = searchParams.get("id");
  const fileName = searchParams.get("filename");

  const [metaData, setMetaData] = useState<any[]>([]);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

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



  return (
    <div className="allplots-container" >
      <div className="allplots-header">
        <a href={PageRoutes.homepage.path}>BACK</a>
      </div>

      <div className="allplots-body">

        <div className="allplots-leftcon">

          <div className="plots-actionsbox">
            <div className="plotselection-box">
              <p>Variable</p>
            </div>
            <div className="plotselection-box">
              <p>Plot Type</p>
            </div>
          </div>
          <div className="plots-areabox">
            <h2>(Table) - (Name)</h2>

            <div className="plots-box">
              <p>Plot</p>
            </div>
            {fetchedData.map((row, index) => (
              <p key={index}>{row.Name}</p>
            ))}

          </div>
          <p className="infotxt">Plots Name | Item(s): 100</p>
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
          <div className="infoData"></div>
          <h1>CSV File Info</h1>
          <div className="csvfiledata-infobox">
            <h3>Insights</h3>
          </div>
        </div>
      </div>


    </div>
  );
}

export default AllPlots;