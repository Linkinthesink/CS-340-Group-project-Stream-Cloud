import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AvailabilityTable from '../AvalabilityTable';

export function TrackAvailability({ backendURL, trackToEdit }) {
    const [trackTitle, setTrackTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [availabilities, setAvailabilities] = useState([]);
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
        }
    }, [track, navigate]);


    useEffect(() => {
        const fetchAvailability = async () => {
            if (!track || !track.trackID) return;
            try {
                const res = await fetch((backendURL ? backendURL : '') + '/tracks-availability/' + track.trackID);
                const data = await res.json();
                setAvailabilities(data.track || []);
            } catch (err) {
                console.error('Failed to fetch availability', err);
            }
        };
        fetchAvailability();
    }, [backendURL, track]);

    if (!track) return null;


    const onDelete = async (id, name) => {
        if (!window.confirm(`Delete availability ${name}?`)) return;
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/tracks/' + id, { method: 'DELETE' });
            if (response.status === 204) {
                setTracks(tracks.filter(t => t.trackID !== id));
                alert(`Deleted availability ${name}`);
            } else {
                alert('Failed to delete availability');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };
    const onEdit = (track) => {
        navigate('/edit-availability', { state: track });
    };
    const onAdd = (track) => {
        navigate('/add-availability', { state: track });
    }

    return (
        <div>
            <h1>Track Availability</h1>
            <table className="page">
                <thead>
                    <tr>
                        <th>Track Title</th>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{track.trackTitle}</td>
                        <td>{track.albumTitle || ''}</td>
                        <td>{track.releaseDate}</td>
                    </tr>
                </tbody>
            </table>

            <table className="page">
                <thead>
                    <tr>
                        <th>Available On</th>
                        <th>URL</th>
                        <th>
                        <button onClick={e => { e.preventDefault(); onAdd && onAdd(track); }} >Add</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <AvailabilityTable availabilities={availabilities} onDelete={onDelete} onEdit={onEdit}/>

                </tbody>
            </table>
        </div>
    );
}
