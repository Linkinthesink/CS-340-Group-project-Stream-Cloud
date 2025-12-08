/*
PlatformsPage by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for PlatformsPage file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlatformTable from '../Components/PlatformsComponents/PlatformTable';


export function PlatformsPage ({ backendURL }) {
    
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();

    // Fetch platform data from the backend
    const getData = async () => {
        try {
            const response = await fetch((backendURL) + '/platforms');
            const { platforms } = await response.json();
            setPlatforms(platforms || []);
        } catch (err) {
            console.error('Failed to fetch platforms', err);
        }
    };

    useEffect(() => { getData(); }, []);

    const onDelete = async (id, name) => {
        if (!window.confirm(`Delete platform ${name}?`)) return;
        try {
            const response = await fetch((backendURL) + '/platforms/' + id, { method: 'DELETE' });
            if (response.status === 204) {
                setPlatforms(platforms.filter(p => p.platformID !== id));
                alert(`Deleted platform ${name}`);
            } else {
                alert('Failed to delete platform');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };

    const onEdit = (platform) => {
        navigate('/platform/edit', { state: platform });
    };

    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Country</th>
                            <th>
                                <Link to="/platform/add">
                                    <button>Add</button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlatformTable platforms={platforms} onDelete={onDelete} onEdit={onEdit} />
                    </tbody>
                </table>
            </div>
        </>
    );
}