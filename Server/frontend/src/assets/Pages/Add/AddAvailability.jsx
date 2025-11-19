import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function AddAvailabilityPage({ backendURL }) {
    const [platformID, setPlatformID] = useState('');
    const [url, setUrl] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


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



    const submit = async (e) => {
        e.preventDefault();
        try {
            alert('Availability added');
            navigate('/tracks');
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    return (
        <div>
            <h1>Add Availability</h1>

            <table className="page">
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
                        <td>
                            <button onClick={submit}>Submit</button>
                            &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AddAvailabilityPage;
