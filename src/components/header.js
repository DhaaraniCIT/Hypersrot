import logo from '../logo.png';
import '../App.css';

function Header() {
return(
    <nav className="navbar fixed-top navbar-light bg-light p-0">
        <div className="container-fluid">
            <a className="navbar-brand p-0" href="/">
                <img src={logo} alt="" width="100" height="50" className="d-inline-block align-text-top"/>
            </a>
        </div>
    </nav>
)
}

export default Header;