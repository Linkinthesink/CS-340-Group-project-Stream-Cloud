import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddTrackPage({ backendURL }) {
    const [trackTitle, setTrackTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [albumID, setAlbumID] = useState('');
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/tracks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumID, trackTitle, releaseDate })
            });
            if (response.status === 201) {
                alert('Track added successfully');
                navigate('/tracks');
            } else {
                alert('Failed to add track');
            }
        } catch (err) {
            console.error(err);
            alert('Add failed');
        }
    };

    useEffect(() => {
    const fetchAlbums = async () => {
        try {
            const res = await fetch((backendURL ? backendURL : '') + '/albums');
            const data = await res.json();
            setAlbums(data.albums || []);
            if (data.albums && data.albums.length > 0) setAlbumID(data.albums[0].albumID);
        } catch (err) {
            console.error('Failed to fetch albums', err);
        }
    };
    fetchAlbums();
}, [backendURL]);

    return (
        <div>
            <h1>Add Track</h1>
            <table className="page">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Track Title</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select value={albumID} onChange={e => setAlbumID(e.target.value)}>
                                <option value="">-- Select album --</option>
                                {albums.map(a => (
                                    <option key={a.albumID} value={a.albumID}>{a.albumTitle}</option>
                                ))}
                            </select>
                        </td>
                        <td><input type="text" placeholder="Track Title" value={trackTitle} onChange={e => setTrackTitle(e.target.value)} /></td>
                        <td><input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /></td>
                        <td>
                            <button onClick={submit}>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

