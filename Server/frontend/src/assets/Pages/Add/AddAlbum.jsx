import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function AddAlbumPage ({ backendURL }) {

    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genre, setGenre] = useState('');
    const [artistID, setArtistID] = useState('');
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState('');

    const navigate = useNavigate();

    const submit = async () => {
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumTitle, releaseDate, genre, artistID })
            });
            if (response.status === 201) {
                alert('Album added');
                navigate('/albums');
            } else {
                const text = await response.text();
                alert('Failed to add album: ' + text);
            }
        } catch (err) {
            console.error(err);
            alert('Request failed');
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch((backendURL ? backendURL : '') + '/artists');
                const data = await res.json();
                // backend returns { artist: [...] }
                setArtists(data.artist || []);
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