/*
EditTrack by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for EditTrack file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function EditTrackPage({ backendURL, trackToEdit }) {

    const [trackTitle, setTrackTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [albumID, setAlbumID] = useState('');
    const [albums, setAlbums] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const trackFromState = location?.state;
    const track = trackFromState || trackToEdit;


    useEffect(() => {
        if (!track) {
            navigate('/tracks');
        } else {
            setTrackTitle(track.trackTitle || '');
            setReleaseDate(track.releaseDate || '');
            setAlbumID(track.albumID || '');
        }
    }, [track, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL) + '/tracks/' + track.trackID, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackTitle, releaseDate, albumID })
            });
            if (response.status === 200) {
                alert('Track updated successfully');
                navigate('/tracks');
            } else {
                alert('Failed to update track');
            }
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch((backendURL) + '/albums');
                const data = await res.json();
                setAlbums(data.albums || []);
                if (!albumID && data.albums && data.albums.length > 0) setAlbumID(data.albums[0].albumID);
            } catch (err) {
                console.error('Failed to fetch albums', err);
            }
        };
        fetchAlbums();
    }, [backendURL, albumID]);

    if (!track) return null;

    return (
        <div class="table-container">
            <table className="refrenceElement">
                <thead>
                    <tr>
                        <th>Track Title</th>
                        <th>Album</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{track.trackTitle}</td>
                        <td>{track.albumTitle || ''}</td>
                        <td>{track.releaseDate.split('T')[0]}</td>
                    </tr>
                </tbody>
            </table>

            <table class="page">

                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Track Title" value={trackTitle} onChange={e => setTrackTitle(e.target.value)} /></td>
                        <td>
                            <select value={albumID} onChange={e => setAlbumID(e.target.value)}>
                                <option value="">-- Select album --</option>
                                {albums.map(a => (
                                    <option key={a.albumID} value={a.albumID}>{a.albumTitle}</option>
                                ))}
                            </select>
                        </td>
                        <td><input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={submit}>Update</button>
                <button onClick={() => navigate('/tracks')}>Cancel</button>
            </div>
        </div>
    );
}
