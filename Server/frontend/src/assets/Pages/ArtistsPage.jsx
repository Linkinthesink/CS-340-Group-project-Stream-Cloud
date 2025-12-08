/*
AvailabilitySelectPage by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AvailabilitySelectPage file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArtistTable from '../Components/ArtistComponents/ArtistTable';


export function ArtistsPage({ backendURL }) {

    const [artists, setArtist] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch(backendURL + '/artists');
            const {artist} = await response.json();
            setArtist(artist);
        } catch (err) {
            console.error('Failed to fetch artists', err);
        }
    };

    useEffect(() => { getData(); }, []);

    const onDelete = async (id, name) => {
        if (!window.confirm(`Delete artist ${name}?`)) return;
        try {
            const response = await fetch((backendURL) + '/artists/' + id, { method: 'DELETE' });
            if (response.status === 204) {
                setArtist(artists.filter(e => e.artistID !== id));
                alert(`Deleted artist ${name}`);
            } else {
                alert('Failed to delete artist');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };

    
    const onEdit = (artist) =>{
        navigate('/artist/edit', { state: artist });
    }


    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Genre</th>
                            <th>Label</th>
                            <th>
                                <Link to="/artist/add">
                                <button>Add</button>
                                </Link>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    <ArtistTable artists={artists} onDelete={onDelete} onEdit={onEdit}></ArtistTable>
                    </tbody>
                </table>
            </div>

               
        </>
    );
}