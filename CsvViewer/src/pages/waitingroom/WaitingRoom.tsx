import { useState } from "react"
import "../../index.css"
import "./Waitingroom.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageRoutes } from "../../Constants";


function WaitingRoom() {
    const [searchParams] = useSearchParams();
    const fileId = searchParams.get("id");
    const fileName = searchParams.get("filename");
    const fileType = searchParams.get("filetype");

    const navigate = useNavigate();

    const [readyDownload, setReadyDownload] = useState(false);
    const [percentage, setPercentage] = useState(100);
    
    const handleDownload = () => {
        const token = ""
        const url = `${PageRoutes.downloadpage.path}${token}`
        navigate(url)
    }

  return (
    <div className="emptypage-container">
        <div className="emptypage-topbox">
            <h1>Converting CSV to Json</h1>
        </div>
        <div className="emptypage-bottombox">
            <div className="progresstxt-box">
                <span>Please wait ... [ <span className="percentage">{percentage}</span> %]</span>
            </div>
            <div className="progressbar-box">
                <div className="progressbar"></div>
            </div>
        </div>
        <button disabled={!readyDownload} onClick={handleDownload}
            className={`downloadBtn ${!readyDownload ? "disabled" : ""}`}
        >
            Download JSON
        </button>
    </div>
  )
}

export default WaitingRoom