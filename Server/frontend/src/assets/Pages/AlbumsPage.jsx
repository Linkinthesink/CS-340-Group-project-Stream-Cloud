import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AlbumTable from '../Components/AlbumsComponents/AlbumTable';


export function AlbumsPage ({ backendURL }) {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/albums');
            const { albums } = await response.json();
            setAlbums(albums || []);
        } catch (err) {
            console.error('Failed to fetch albums', err);
        }
    };

    useEffect(() => { getData(); }, []);

    const onDelete = async (id, name) => {
        if (!window.confirm(`Delete album ${name}?`)) return;
        try {
            const response = await fetch((backendURL ? backendURL : '') + '/albums/' + id, { method: 'DELETE' });
            if (response.status === 204) {
                setAlbums(albums.filter(a => a.albumID !== id));
                alert(`Deleted album ${name}`);
            } else {
                alert('Failed to delete album');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };

    const onEdit = (album) => {
        navigate('/album/edit', { state: album });
    };

    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Album</th>
                            <th>Release Date</th>
                            <th>Genre</th>
                            <th>Artist</th>
                            <th>
                                <Link to="/album/add">
                                    <button>Add</button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AlbumTable albums={albums} onDelete={onDelete} onEdit={onEdit} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

/* 


*/