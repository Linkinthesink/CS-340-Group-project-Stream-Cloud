/*
Layout by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for Layout file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/


import { Outlet, useNavigate, useLocation  } from 'react-router-dom';
import { useState } from 'react';

import logoDark from '../src/assets/Images/Logo-Dark.png'
import logoLight from '../src/assets/Images/Logo-Light.png'


export function Layout() {

  // Define navigation pages
  const home = {"link":"/", "text":"Home"}
  const artists = {"link":"/artists", "text":"Artists"}
  const albums = {"link":"/albums", "text":"Albums"}
  const tracks = {"link":"/tracks", "text":"Tracks"}
  const platforms = {"link":"/platforms", "text":"Platforms"}
  const available = {"link":"/avilabilityselect", "text":"Availability"}

  const navigate = useNavigate();
  const locatoin = useLocation();

  let pages = [home, artists, albums, tracks, available, platforms];

  // Function to get the current page based on the route used to update the current page state
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

  // Function to check if dark mode is enabled used for logo selection
  function isDarkModeEnabled() {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; 
  }

  // Inline contitoinal used to render the current page as a diffrent style in the navbar
  return (
    <div>
      {(currentPage.text != "Home") ? <img src={isDarkModeEnabled() ? logoDark : logoLight} alt="Stream Cloud" id="miniLogo"></img> : null}
      <nav>
        <div id="Navbar">
              {pages.map((page, i) => (page.text != currentPage.text ? <button onClick={e => {e.preventDefault(); setCurrent(page.link)}}>{page.text}</button> : <div id="currentPage" ><button onClick={e => {e.preventDefault(); setCurrent(page.link)}}>{page.text}</button></div>))}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
