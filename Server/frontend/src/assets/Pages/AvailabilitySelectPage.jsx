import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AvailabilitySelectTable from '../Components/AvailabilityComponents/AvailabilitySelectTable';


export function AvailabilitySelectPage ({ backendURL }) {
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
        navigate('/track/edit', { state: track });
    };

    const available = (track) => {
        navigate('/availability', { state: track });
    };


    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Select Track to view availability </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AvailabilitySelectTable tracks={tracks} available={available} />
                    </tbody>
                </table>
            </div>
        </>
    );
}
