/*
App by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for App file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import './App.css';
import { Routes, Route } from 'react-router-dom';

import {Layout} from './Layout'


// Main pages
import {HomePage} from './assets/Pages/HomePage';
import {ArtistsPage} from './assets/Pages/ArtistsPage';
import {AlbumsPage} from './assets/Pages/AlbumsPage';
import {TracksPage} from './assets/Pages/TracksPage';
import {PlatformsPage} from './assets/Pages/PlatformsPage'
import {AvailabilitySelectPage} from './assets/Pages/AvailabilitySelectPage'

// Edit pages
import {EditTrackPage} from './assets/Pages/Edit/EditTrack'
import {EditArtistPage} from './assets/Pages/Edit/EditArtist'
import {EditAlbumPage} from './assets/Pages/Edit/EditAlbum'
import {EditPlatformPage} from './assets/Pages/Edit/EditPlatform'

// Add pages
import {AddTrackPage} from './assets/Pages/Add/AddTrack'
import {AddArtistPage} from './assets/Pages/Add/AddArtist'
import {AddAlbumPage} from './assets/Pages/Add/AddAlbum'
import {AddPlatformPage} from './assets/Pages/Add/AddPlatform'

// Availability pages
import {TrackAvailability} from './assets/Components/AvailabilityComponents/TrackAvailability'
import {EditAvalabilityPage} from './assets/Pages/Edit/EditAvalability'
import {AddAvailabilityPage} from './assets/Pages/Add/AddAvailability'

// Define the backend port and URL for API requests
const backendPort = 8885;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

  return (
    <Routes>
      < Route element={<Layout />}>
        <Route path="/" element={<HomePage backendURL={backendURL}/>} />
        <Route path="/artists" element={<ArtistsPage backendURL={backendURL} />} />
        <Route path="/albums" element={<AlbumsPage backendURL={backendURL} />} />
        <Route path="/tracks" element={<TracksPage backendURL={backendURL} />} />
        <Route path="/platforms" element={<PlatformsPage backendURL={backendURL} />} />
        <Route path="/avilabilityselect" element={<AvailabilitySelectPage backendURL={backendURL} />} />  


        <Route path="/artist/edit" element={<EditArtistPage backendURL={backendURL} />} />
        <Route path="/album/edit" element={<EditAlbumPage backendURL={backendURL} />} />
        <Route path="/track/edit" element={<EditTrackPage backendURL={backendURL} />} />
        <Route path="/platform/edit" element={<EditPlatformPage backendURL={backendURL} />} />
        <Route path="/availability/edit" element={<EditAvalabilityPage backendURL={backendURL} />} />



        <Route path="/artist/add" element={<AddArtistPage backendURL={backendURL}/>} />
        <Route path="/album/add" element={<AddAlbumPage backendURL={backendURL}/>} />
        <Route path="/track/add" element={<AddTrackPage backendURL={backendURL} />} />
        <Route path="/platform/add" element={<AddPlatformPage backendURL={backendURL} />} />
        

        <Route path="/availability" element={<TrackAvailability backendURL={backendURL}/>} />
        <Route path="/edit-availability" element={<EditAvalabilityPage backendURL={backendURL} />} />
        <Route path="/add-availability" element={<AddAvailabilityPage backendURL={backendURL} />} />

      </Route>
    </Routes>
  );

} export default App;
