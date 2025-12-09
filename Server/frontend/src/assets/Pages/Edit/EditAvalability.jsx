/*
EditAvailability by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for EditAvailability file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function EditAvalabilityPage({ backendURL }) {

    const [tracks, setTracks] = useState([]);
    const [trackID, setTrackID] = useState('');
    const [platformID, setPlatformID] = useState('');
    const [url, setUrl] = useState('');
    const [platforms, setPlatforms] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const availabilityFromState = location?.state;
    const availability = availabilityFromState;


    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const res = await fetch((backendURL) + '/platforms');
                const data = await res.json();
                setPlatforms(data.platforms || []);
                if (!platformID && data.platforms && data.platforms.length > 0) setPlatformID(data.platforms[0].platformID);
            } catch (err) {
                console.error('Failed to fetch platforms', err);
            }
        };
        fetchPlatforms();
        setPlatformID(availability.platformID || '');
        setUrl(availability.url || '');
    }, [availability, navigate]);

    const fetchTracks = async () => {
        try {
            const response = await fetch((backendURL) + '/tracks');
            const { tracks } = await response.json();

            setTracks(tracks || []);
        } catch (err) {
            console.error('Failed to fetch tracks', err);
        }
    };
    fetchTracks();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch((backendURL) + `/tracks-availability/${availability.trackID}/${availability.platformID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({platformID, trackID, url })
            });
            if (res.status === 200) {
                alert('Availability updated');
                navigate('/availability', { state: availability });
            } else {
                alert('Failed to update availability');
            }
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    if (!availability) return null;

    console.log(availability)

    return (
        <div class="table-container">
            <table className="refrenceElement">
                <thead>
                    <tr>
                        <th>Track</th>
                        <th>Platform</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{availability.trackTitle}</td>
                        <td>{availability.platformName}</td>
                        <td>{availability.url}</td>
                    </tr>
                </tbody>
            </table>

            <table class="page">
                <tbody>
                    <tr>
                        <td>
                            <select value={trackID} onChange={e => setTrackID(e.target.value)}>
                                {tracks.map(t => <option key={t.trackID} value={t.trackID}>{t.trackTitle}</option>)}
                            </select>
                        </td>
                        <td>
                            <select value={platformID} onChange={e => setPlatformID(e.target.value)}>
                                {platforms.map(p => <option key={p.platformID} value={p.platformID}>{p.platformName}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="text" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>   
                <button onClick={submit}>Submit</button>
                <button onClick={() => navigate('/availability', { state: availability })}>Cancel</button>
            </div>
        </div>
    );
}

export default EditAvalabilityPage;
