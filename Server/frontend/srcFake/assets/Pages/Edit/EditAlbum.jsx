import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function EditAlbumPage ({ backendURL, albumToEdit }) {
    const navigate = useNavigate();
    const location = useLocation();
    const albumFromState = location?.state;
    const album = albumFromState || albumToEdit;

    useEffect(() => { if (!album) navigate('/albums'); }, [album, navigate]);

    const [albumTitle, setAlbumTitle] = useState(album?.albumTitle || '');
    const [releaseDate, setReleaseDate] = useState(album?.releaseDate || '');
    const [genre, setGenre] = useState(album?.genre || '');
    const [artistID, setArtistID] = useState(album?.artistID || '');
    const [artists, setArtists] = useState([]);

    const submit = async () => {
        if (!album) return;
        const id = album.albumID ?? album.id;
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/albums/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumTitle, releaseDate, genre, artistID })
            });
            if (response.ok) {
                alert('Album updated');
                navigate('/albums');
            } else {
                const text = await response.text();
                alert('Update failed: ' + text);
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
                setArtists(data.artist || []);
                // ensure artistID is set if not already
                if (!artistID && (album?.artistID || (data.artist && data.artist[0]?.artistID))) {
                    setArtistID(album?.artistID || (data.artist && data.artist[0]?.artistID) || '');
                }
            } catch (err) {
                console.error('Failed to fetch artists', err);
            }
        };
        fetchArtists();
    }, [backendURL, album, artistID]);

    return (
        <div>
            <table className="page">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='collection-item'>
                        <td>{album?.albumTitle}</td>
                        <td>{album?.releaseDate}</td>
                        <td>{album?.genre}</td>
                        <td>{album?.artistName || ''}</td>
                    </tr>
                </tbody>
            </table> 


            <table className="page">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Artist</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className = 'edit' >
                            <label htmlFor="AlbumName"></label>
                            <input type="text" id="AlbumTitle" name="AlbumTitle" placeholder="Album Title" maxLength={50} value={albumTitle} onChange={e=>setAlbumTitle(e.target.value)} required />
                        </td>
                        <td className = 'edit' >
                            <label htmlFor="ReleaseDate"></label>
                            <input type="text" id="ReleaseDate" name="ReleaseDate" placeholder="ReleaseDate" maxLength={20} value={releaseDate} onChange={e=>setReleaseDate(e.target.value)} required />
                        </td>
                        <td className = 'edit' >
                            <label htmlFor="Genre"></label>
                            <input type="text" id="Genre" name="Genre" placeholder="Genre" maxLength={20} value={genre} onChange={e=>setGenre(e.target.value)} required />
                        </td>
                        <td className = 'edit' >
                            <label htmlFor="ArtistSelect"></label>
                            <select id="ArtistSelect" name="ArtistSelect" value={artistID} onChange={e => setArtistID(e.target.value)} required>
                                <option value="">-- Select Artist --</option>
                                {artists.map(a => (
                                    <option key={a.artistID} value={a.artistID}>{a.artistName}</option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <button onClick={submit}>Submit</button>
                            <Link to="/albums"><button>Cancel</button></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}