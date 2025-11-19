import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlatformTable from '../Components/PlatformsComponents/PlatformTable';

export function PlatformsPage ({ backendURL }) {
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/platforms');
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
            const response = await fetch((backendURL ? backendURL : '') + '/platforms/' + id, { method: 'DELETE' });
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
        navigate('/edit-platform', { state: platform });
    };

    return (
        <>
            <h1>Platforms</h1>
            <table className="page">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Country</th>
                        <th>
                            <Link to="/add-platform">
                                <button>Add</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <PlatformTable platforms={platforms} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>
        </>
    );
}