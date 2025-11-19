import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import {Link} from "react-router-dom"

import {Layout} from './Layout'

import {HomePage} from './assets/Pages/HomePage';
import {ArtistsPage} from './assets/Pages/ArtistsPage';
import {AlbumsPage} from './assets/Pages/AlbumsPage';
import {TracksPage} from './assets/Pages/TracksPage';
import {PlatformsPage} from './assets/Pages/PlatformsPage'

import {EditTrackPage} from './assets/Pages/Edit/EditTrack'
import {EditArtistPage} from './assets/Pages/Edit/EditArtist'
import {EditAlbumPage} from './assets/Pages/Edit/EditAlbum'
import {EditPlatformPage} from './assets/Pages/Edit/EditPlatform'

import {AddTrackPage} from './assets/Pages/Add/AddTrack'
import {AddArtistPage} from './assets/Pages/Add/AddArtist'
import {AddAlbumPage} from './assets/Pages/Add/AddAlbum'
import {AddPlatformPage} from './assets/Pages/Add/AddPlatform'

import {TrackAvailability} from './assets/Components/TracksComponents/TrackAvailability'

// Define the backend port and URL for API requests
const backendPort = 8885;  // Use the port you assigned to the backend server, this would normally go in .env file
//const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    const [artistToEdit, setArtistToEdit] = useState();

  return (
    <Routes>
      < Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage backendURL={backendURL} setArtistToEdit={setArtistToEdit} />} />
        <Route path="/albums" element={<AlbumsPage backendURL={backendURL} />} />
        <Route path="/tracks" element={<TracksPage backendURL={backendURL} />} />
        <Route path="/platforms" element={<PlatformsPage backendURL={backendURL} />} />


        <Route path="/edit-album" element={<EditAlbumPage backendURL={backendURL} />} />
        <Route path="/edit-artist" element={<EditArtistPage artistToEdit={artistToEdit} backendURL={backendURL} />} />
        <Route path="/edit-track" element={<EditTrackPage backendURL={backendURL} />} />
        <Route path="/edit-platform" element={<EditPlatformPage backendURL={backendURL} />} />

        
        <Route path="/add-track" element={<AddTrackPage backendURL={backendURL} />} />
        <Route path="/add-platform" element={<AddPlatformPage backendURL={backendURL} />} />
        <Route path="/add-album" element={<AddAlbumPage backendURL={backendURL}/>} />
        <Route path="/add-artist" element={<AddArtistPage backendURL={backendURL}/>} />

        <Route path="/availability" element={<TrackAvailability backendURL={backendURL}/>} />

      </Route>
    </Routes>
  );

} export default App;



/*


          <Route path="/add-album" element={<AddAlbumPage />} />
          <Route path="/add-artist" element={<AddArtistPage />} />
          <Route path="/add-track" element={<AddTrackPage />} />
          <Route path="/add-platform" element={<AddPlatformPage />} />





            <Route element={<Layout/>}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/artists" element={<ArtistsPage backendURL={backendURL} />}></Route>
            </Route>



    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);

    // Get the data from the database
    const getData = async function () {
        if (message.length > 0) return; // Skip if data is already fetched
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL);
            
            // Convert the response into JSON format
            const rows = await response.json();
            
            // Update the message state with the response data
            setMessage(JSON.stringify(rows));
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);



*/