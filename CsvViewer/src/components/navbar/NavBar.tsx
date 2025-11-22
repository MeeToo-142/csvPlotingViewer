import "../../index.css"
import "./NavBar.css"

function NavBar() {
  return (
    <nav>
        <div className="navRight">
          <a href={`${import.meta.env.BASE_URL}`} className="logo">@csvViewer</a>
        </div>
        <div className="navLeft">
          <a href="https://github.com/John-Da/csvPlotter-ReactFlask" target="_blank" className="linkto">GitHub</a>
        </div>
    </nav>
  )
}

export default NavBar