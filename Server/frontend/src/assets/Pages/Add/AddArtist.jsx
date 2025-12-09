/*
AddAvailability by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AddAvailability file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function AddArtistPage ({ backendURL }) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [label, setLabel] = useState('');

    const navigate = useNavigate();

    const submit = async (e) => {
        console.log('Submitting new artist:', { name, genre, label });
        e.preventDefault();
        try {
            const response = await fetch(backendURL + '/artists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, genre, label })
            });
            if (response.status === 201) {
                alert('Artist added successfully');
                navigate('/artists');
            } else {
                alert('Failed to add artist');
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
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>    
                        <td class = 'edit' >
                            <input
                                type="text"
                                placeholder="Enter name here"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </td>
                        <td class = 'edit' >
                            <input
                                type="text"
                                placeholder="Enter genre here"
                                value={genre}
                                onChange={e => setGenre(e.target.value)} />
                        </td>
                        <td class = 'Label' >
                            <input
                                type="text"
                                placeholder="Enter label here"
                                value={label}
                                onChange={e => setLabel(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table> 
            <div>
                <button onClick={submit}>Add</button>    
                <button onClick={() => navigate('/artists')}>Cancel</button>
            </div>
        </div>

        
    );


}