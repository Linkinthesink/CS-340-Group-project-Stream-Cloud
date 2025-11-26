import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function EditAvalabilityPage({ backendURL, availabilityToEdit }) {
    const [platformID, setPlatformID] = useState('');
    const [url, setUrl] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const availabilityFromState = location?.state;
    const availability = availabilityFromState || availabilityToEdit;

    useEffect(() => {
        if (!availability) {
            navigate('/tracks');
            return;
        }
        setPlatformID(availability.platformID || '');
        setUrl(availability.url || '');
    }, [availability, navigate]);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const res = await fetch((backendURL ? backendURL : '') + '/platforms');
                const data = await res.json();
                setPlatforms(data.platforms || []);
                if (!platformID && data.platforms && data.platforms.length > 0) setPlatformID(data.platforms[0].platformID);
            } catch (err) {
                console.error('Failed to fetch platforms', err);
            }
        };
        fetchPlatforms();
    }, [backendURL, platformID]);

    if (!availability) return null;

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch((backendURL ? backendURL : '') + `/tracks-availability/${availability.trackID}/${platformID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
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

    return (
        <div class="table-container">
            <table className="refrenceElement">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{availability.platformName}</td>
                        <td>{availability.url}</td>
                    </tr>
                </tbody>
            </table>

            <table class="page">
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
                <button onClick={submit}>Submit</button>
                <button onClick={() => navigate('/availability', { state: availability })}>Cancel</button>
            </div>
        </div>
    );
}

export default EditAvalabilityPage;
