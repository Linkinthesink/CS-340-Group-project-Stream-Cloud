/*
AddAlbum by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AddAlbum file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddAlbumPage ({ backendURL }) {

    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genre, setGenre] = useState('');
    const [artistID, setArtistID] = useState('');
    const [artists, setArtists] = useState([]);

    const navigate = useNavigate();

    const submit = async () => {
        try {
            const response = await fetch((backendURL) + '/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumTitle, releaseDate, genre, artistID })
            });
            if (response.status === 201) {
                alert('Album added successfully');
                navigate('/albums');
            } else {
                alert('Failed to add album');
            }
        } catch (err) {
            console.error(err);
            alert('Add failed');
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch((backendURL) + '/artists');
                const data = await res.json();
                setArtists(data.artist || []);
                if (data.artist && data.artist.length > 0) setArtistID(data.artist[0].artistID);
            } catch (err) {
                console.error('Failed to fetch artists', err);
            }
        };
        fetchArtists();
    }, [backendURL]);

    return (
        <div class="table-container">
            <table class="page">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>    
                        <td class = 'edit' >
                            <label for="AlbumName"></label>
                                                    <input type="text" id="AlbumTitle" name="AlbumTitle" placeholder="Album Title" maxLength={50} value={albumTitle} onChange={e=>setAlbumTitle(e.target.value)} required />
                        </td>
                        <td class = 'edit' >
                            <label for="ReleaseDate"></label>
                            <input type="date" id="ReleaseDate" name="ReleaseDate" placeholder="ReleaseDate" maxlength="20" required></input>
                        </td>
                        <td class = 'edit' >
                            <label htmlFor="Genre"></label>
                            <input type="text" id="Genre" name="Genre" placeholder="Genre" maxLength={20} value={genre} onChange={e=>setGenre(e.target.value)} required />
                        </td>
                        <td class = 'edit' >
                            <label htmlFor="ArtistSelect"></label>
                            <select id="ArtistSelect" name="ArtistSelect" value={artistID} onChange={e => setArtistID(e.target.value)} required>
                                <option value="">-- Select Artist --</option>
                                {artists.map(a => (
                                    <option key={a.artistID} value={a.artistID}>{a.artistName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                </tbody>
            </table> 
            <div>
                <button onClick={submit}>Add</button>    
                <button onClick={() => navigate('/albums')}>Cancel</button>
            </div>
        </div>

        
    );


}