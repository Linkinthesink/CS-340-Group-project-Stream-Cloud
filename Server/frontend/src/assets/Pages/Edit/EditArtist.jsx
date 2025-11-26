import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function EditArtistPage ({ artistToEdit, backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Prefer artist passed via route state, fallback to prop
    const artistFromState = location?.state;
    const artist = artistFromState || artistToEdit;

    // If no artist was provided, send the user back to the artists list
    useEffect(() => {
        if (!artist) navigate('/artists');
    }, [artist, navigate]);

    const [name, setName] = useState(artist?.artistName || '');
    const [genre, setGenre] = useState(artist?.genre || '');
    const [label, setLabel] = useState(artist?.label || '');

    const editArtist = async () => {
        if (!artist) return;
        const editedArtist = { artistName: name, genre, label };
        const id = artist.artistID ?? artist.id;
        const url = (backendURL ? backendURL : '') + '/artists/' + id;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedArtist)
            });
            if (response.ok) {
                alert('Successfully edited artist');
            } else {
                const text = await response.text();
                alert(`Failed to edit artist: ${response.status} ${text}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to edit artist (network error)');
        }
        navigate('/artists');
    };

    return (
        <div class="table-container">
            <table className="refrenceElement">
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{artist.artistName}</td>
                        <td>{artist.genre}</td>
                        <td>{artist.label}</td>
                    </tr>
                </tbody>
            </table>
            <table class="page">
                <tbody>
                    <tr>
                        <td>
                            <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} /> 
                        </td>
                        <td>
                            <input
                            type="text"
                            value={genre}
                            onChange={e => setGenre(e.target.value)} /> 
                        </td>
                        <td>
                            <input
                            type="text"
                            size="11"
                            value={label}
                            onChange={e => setLabel(e.target.value)} />
                        </td>
                    </tr>

                </tbody>
                <div>
                    <button onClick={editArtist}>Update</button>
                    <Link to="/artists" style={{ marginLeft: 8 }}><button>Cancel</button></Link>
                </div>
            </table>

        </div>
    );

}