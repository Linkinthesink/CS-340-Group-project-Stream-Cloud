import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AvailabilityTable from '../AvalabilityTable';

export function TrackAvailability({ backendURL, trackToEdit }) {
    const [trackTitle, setTrackTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [albumID, setAlbumID] = useState('');
    const [albums, setAlbums] = useState([]);
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
            setAlbumID(track.albumID || '');
        }
    }, [track, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/tracks/' + track.trackID, {
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
                const res = await fetch((backendURL ? backendURL : '') + '/albums');
                const data = await res.json();
                setAlbums(data.albums || []);
                if (!albumID && data.albums && data.albums.length > 0) setAlbumID(data.albums[0].albumID);
            } catch (err) {
                console.error('Failed to fetch albums', err);
            }
        };
        fetchAlbums();
    }, [backendURL, albumID]);

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

    return (
        <div>
            <h1>Track Availability</h1>
            <table className="page">
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
                        <td>{track.releaseDate}</td>
                    </tr>
                </tbody>
            </table>

            <table className="page">
                <thead>
                    <tr>
                        <th>Available On</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    <AvailabilityTable availabilities={availabilities} />
                </tbody>
            </table>
        </div>
    );
}
