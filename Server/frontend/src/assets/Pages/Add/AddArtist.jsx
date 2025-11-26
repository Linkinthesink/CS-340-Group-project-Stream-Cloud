import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export function AddArtistPage ({ backendURL }) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [label, setLabel] = useState('');

    const navigate = useNavigate();

    const submit = async () => {
        const newArtist = {name, genre, label}
        const response = await fetch(
            backendURL + '/artists', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newArtist)
                }
        );
        if(response.status === 201){
            alert("Sucsessfully added artist");
        } else{
            alert(`Failed to add artist status ${response.status}`)
        }
        navigate('/');

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