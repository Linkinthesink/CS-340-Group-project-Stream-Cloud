import { Outlet, Link, useNavigate, useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo from '../src/assets/Images/StreamCloudLogo.png'


export function Layout() {

  const home = {"link":"/", "text":"Home"}
  const artists = {"link":"/artists", "text":"Artists"}
  const albums = {"link":"/albums", "text":"Albums"}
  const tracks = {"link":"/tracks", "text":"Tracks"}
  const platforms = {"link":"/platforms", "text":"Platforms"}
  const available = {"link":"/avilabilityselect", "text":"Availability"}

  const navigate = useNavigate();
  const locatoin = useLocation();

  console.log("location", locatoin);

  let pages = [home, artists, albums, tracks, available, platforms];


  const getPage = (route = null) =>{
    if (route != null){
      navigate(route);
    }
    const path = location.pathname;
    let page = home;
    pages.forEach(p => {
      if (p.link === path){
        page = p;
      }
    });
    return(page);
  }

  const [currentPage, setCurrentPage] = useState(getPage());

  const setCurrent = (route) => {
    navigate(route);
    const page = getPage(route);
    setCurrentPage(page);
  }

  return (
    <div>
      {(currentPage.text != "Home") ? <img src={logo} alt="Stream Cloud" id="miniLogo"></img> : null}
      <nav>
        <div id="Navbar">
              {pages.map((page, i) => (page.text != currentPage.text ? <button onClick={e => {e.preventDefault(); setCurrent(page.link)}}>{page.text}</button> : <div id="currentPage" ><button onClick={e => {e.preventDefault(); setCurrent(page.link)}}>{page.text}</button></div>))}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
