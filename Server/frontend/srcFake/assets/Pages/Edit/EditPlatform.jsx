import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function EditPlatformPage({ backendURL, platformToEdit }) {
    const [platformName, setPlatformName] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const platformFromState = location?.state;
    const platform = platformFromState || platformToEdit;

    useEffect(() => {
        if (!platform) {
            navigate('/platforms');
        } else {
            setPlatformName(platform.platformName || '');
            setCountry(platform.country || '');
        }
    }, [platform, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/platforms/' + platform.platformID, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platformName, country })
            });
            if (response.status === 200) {
                alert('Platform updated successfully');
                navigate('/platforms');
            } else {
                alert('Failed to update platform');
            }
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    if (!platform) return null;

    return (
        <div>
            <h1>Edit Platform</h1>
            <table className="page">
                <thead>
                    <tr>
                        <th>Platform Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{platform.platformName}</td>
                        <td>{platform.country}</td>
                    </tr>
                </tbody>
            </table>

            <table className="page">
                <thead>
                    <tr>
                        <th>Platform Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Platform Name" value={platformName} onChange={e => setPlatformName(e.target.value)} /></td>
                        <td><input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} /></td>
                        <td>
                            <button onClick={submit}>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}