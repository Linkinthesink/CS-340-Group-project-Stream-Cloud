import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TrackTable from '../Components/TracksComponents/TrackTable';

export function TracksPage ({ backendURL }) {
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/tracks');
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
            const response = await fetch((backendURL ? backendURL : '') + '/tracks/' + id, { method: 'DELETE' });
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
        navigate('/edit-track', { state: track });
    };

    const available = (track) => {
        navigate('/availability', { state: track });
    };


    return (
        <>
            <h1>Tracks</h1>
            <table className="page">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Track</th>
                        <th>Release Date</th>
                        <th>
                            <Link to="/add-track">
                                <button>Add</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <TrackTable tracks={tracks} available={available} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>
        </>
    );
}
