/*
TracksPage by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for TracksPage file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TrackTable from '../Components/TracksComponents/TrackTable';

export function TracksPage ({ backendURL }) {
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    // Fetch track data from the backend
    const getData = async () => {
        try {
            const response = await fetch((backendURL) + '/tracks');
            const { tracks } = await response.json();
            setTracks(tracks || []);
        } catch (err) {
            console.error('Failed to fetch tracks', err);
        }
    };

    useEffect(() => { getData(); }, []);

    const onDelete = async (id, name) => {
        if (!window.confirm(`Delete track ${name}?`)) return;
        try {
            const response = await fetch((backendURL) + '/tracks/' + id, { method: 'DELETE' });
            if (response.status === 204) {
                setTracks(tracks.filter(t => t.trackID !== id));
                alert(`Deleted track ${name}`);
            } else {
                alert('Failed to delete track');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };

    const onEdit = (track) => {
        navigate('/track/edit', { state: track });
    };

    // Handle track availability navigation
    const available = (track) => {
        navigate('/availability', { state: track });
    };


    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Album</th>
                            <th>Track</th>
                            <th>Release Date</th>
                            <th>Available on</th>
                            <th>
                                <Link to="/track/add">
                                    <button>Add</button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TrackTable tracks={tracks} available={available} onDelete={onDelete} onEdit={onEdit} />
                    </tbody>
                </table>
            </div>
        </>
    );
}
