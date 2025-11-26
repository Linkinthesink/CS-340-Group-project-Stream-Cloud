import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddPlatformPage({ backendURL }) {
    
    const [platformName, setPlatformName] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/platforms', {
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