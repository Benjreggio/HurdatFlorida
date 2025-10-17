import "./Header.css"


function Header() {
    return (
        <nav className = "navbar navbar-expand-lg bg-primary" id = "header">
            <span className="nav-item">Hurricanes through Florida</span>
            <a className="nav-link" href="/"> Home  </a>
            <a className="nav-link" href="/EDA"> Docs </a>
            <a className="nav-link" href="/DataExplorer"> Data  </a>
            <span className="nav-item">Ben Reggio</span>
        </nav>
    );
}

export default Header