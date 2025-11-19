import {Link} from "react-router-dom"
import logo from '../Images/StreamCloudLogo.png'

export function HomePage(){
    return (
        <div className="Homepage">    
                <div id="logobox">
                    <Link to="/artists">
                    <img src={logo} alt="Stream Cloud" id="logo"></img>
                    </Link>
                </div>
                <div class="container">
                    <h2><b>About:</b> </h2>
                    <p>The Stream Cloud is a database management system that is designed to organize and connect
                    information about artists, albums, and tracks across multiple streaming platforms.</p>
                </div>
        </div>
    );
  }
