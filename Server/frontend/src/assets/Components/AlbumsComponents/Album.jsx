import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Album({ album, onDelete, onEdit}) {
    if (!album) return null;

    return (
        <tr className='album'>
            <td>{album.albumTitle}</td>
            <td>{album.releaseDate}</td>
            <td>{album.genre}</td>
            <td>{album.artistName}</td>
            <td>
                <MdCreate onClick={e => {e.preventDefault(); onEdit(album)}}/>&nbsp;
                <MdOutlineRemoveCircle onClick={e => {e.preventDefault(); onDelete(album.albumID, album.albumTitle)}}/>
            </td>
        </tr>
    );
}

export default Album;
