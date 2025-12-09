/*
EditArtist by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for EditArtist file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function EditArtistPage ({ artistToEdit, backendURL }) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [label, setLabel] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const artistFromState = location?.state;
    const artist = artistFromState || artistToEdit;

    useEffect(() => {
        if (!artist) {
            navigate('/tracks');
            return;
        }
        setName(artist.artistName || '');
        setGenre(artist.genre || '');
        setLabel(artist.label || '');   
    }, [artist, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL) + '/artists/' + artist.artistID, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artistName: name, genre, label })
            });
            if (response.status === 200) {
                alert('Artist updated successfully');
                navigate('/artists');
            } else {
                alert('Failed to update artist');
            }
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
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
            </table>
                <div>
                    <button onClick={submit}>Update</button>
                    <Link to="/artists" style={{ marginLeft: 8 }}><button>Cancel</button></Link>
                </div>

        </div>
    );

}