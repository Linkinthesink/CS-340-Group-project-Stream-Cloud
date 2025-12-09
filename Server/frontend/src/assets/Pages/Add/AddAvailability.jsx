/*
AddAvailability by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AddAvailability file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function AddAvailabilityPage({ backendURL }) {

    const [platformID, setPlatformID] = useState('');
    const [url, setUrl] = useState('');
    const [platforms, setPlatforms] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();

    const trackFromState = location?.state;
    const track = trackFromState;

    console.log('Adding availability for track:', track);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL) + '/tracks-availability/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platformID, trackID: track.trackID, url })
            });
            if (response.status === 201) {
                alert('Availability added successfully');
                navigate('/availability', { state: track });
            } else if (response.status === 409) {
                alert('This availability already exists');
            } else {
                alert('Failed to add availability');
            }
        } catch (err) {
            console.error(err);
            alert('Add failed');
        }
    };


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
    }, [backendURL, platformID]);


    return (
        <div class="table-container">
            <table class="page">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
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
                <button onClick={submit}>Add</button>    
                <button onClick={() => navigate('/availability')}>Cancel</button>
            </div>
        </div>
    );
}

export default AddAvailabilityPage;
