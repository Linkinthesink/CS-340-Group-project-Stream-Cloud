/*
EditAlbum by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for EditAlbum file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function EditAlbumPage ({ backendURL, albumToEdit }) {

    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genre, setGenre] = useState('');
    const [artistID, setArtistID] = useState('');
    const [artists, setArtists] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const albumFromState = location?.state;
    const album = albumFromState || albumToEdit;

    useEffect(() => {
        if (!album) {
            navigate('/albums');
        } else {
            setAlbumTitle(album.albumTitle || '');
            setReleaseDate(album.releaseDate || '');
            setGenre(album.genre || '');
            setArtistID(album.artistID || '');
        }
    }, [album, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL) + '/albums/' + album.albumID, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumTitle, releaseDate, genre, artistID })
            });
            if (response.ok) {
                alert('Album updated successfully');
                navigate('/albums');
            } else {
                alert('Failed to update album');
            }
        } catch (err) {
            console.error(err);
            alert('Request failed');
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch((backendURL) + '/artists');
                const data = await res.json();
                setArtists(data.artist || []);
                if (!artistID && (album?.artistID || (data.artist && data.artist[0]?.artistID))) {
                    setArtistID(album?.artistID || (data.artist && data.artist[0]?.artistID) || '');
                }
            } catch (err) {
                console.error('Failed to fetch artists', err);
            }
        };
        fetchArtists();
    }, [backendURL, album, artistID]);

    if (!album) return null;

    return (
        <div class="table-container">
            <table className="refrenceElement">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class='collection-item'>
                        <td>{album.albumTitle}</td>
                        <td>{album.releaseDate.split('T')[0]}</td>
                        <td>{album.genre}</td>
                        <td>{album.artistName || ''}</td>
                    </tr>
                </tbody>
            </table> 


            <table class="page">
                <tbody>
                    <tr>
                        <td className = 'edit' >
                            <label htmlFor="AlbumName"></label>
                            <input type="text" id="AlbumTitle" name="AlbumTitle" placeholder="Album Title" maxLength={50} value={albumTitle} onChange={e=>setAlbumTitle(e.target.value)} required />
                        </td>
                        <td className = 'edit' >
                            <label htmlFor="ReleaseDate"></label>
                            <input type="date" id="ReleaseDate" name="ReleaseDate" placeholder="ReleaseDate" maxLength={20} value={releaseDate} onChange={e=>setReleaseDate(e.target.value)} required />
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
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={submit}>Update</button>
                <Link to="/albums"><button>Cancel</button></Link>
            </div>
        </div>
    );
}