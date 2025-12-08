/*
AddPlatform by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AddPlatform file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddPlatformPage({ backendURL }) {
    
    const [platformName, setPlatformName] = useState('');
    const [country, setCountry] = useState('');
    
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL) + '/platforms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platformName, country })
            });
            if (response.status === 201) {
                alert('Platform added successfully');
                navigate('/platforms');
            } else {
                alert('Failed to add platform');
            }
        } catch (err) {
            console.error(err);
            alert('Add failed');
        }
    };

    return (
        <div class="table-container">
            <table class="page">
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
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={submit}>Add</button>    
                <button onClick={() => navigate('/platforms')}>Cancel</button>
            </div>
        </div>
    );
}