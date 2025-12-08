/*
EditPlatform by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for EditPlatform file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

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
            const response = await fetch((backendURL) + '/platforms/' + platform.platformID, {
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
        <div class="table-container">
            <table className="refrenceElement">
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

            <table class="page">

                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Platform Name" value={platformName} onChange={e => setPlatformName(e.target.value)} /></td>
                        <td><input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={submit}>Update</button>
                <button onClick={() => navigate('/platforms')}>Cancel</button>
            </div>
        </div>
    );
}