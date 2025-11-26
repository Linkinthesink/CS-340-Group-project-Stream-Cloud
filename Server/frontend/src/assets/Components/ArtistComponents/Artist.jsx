import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle,  } from 'react-icons/md';

function Artist({ artist, onDelete, onEdit}) {
    if (!artist) return null;

    return (
        <tr className = 'artist' >
            <td>{artist.artistName}</td>
            <td>{artist.genre} </td>
            <td>{artist.label} </td>
            <td>
                <MdCreate id="icon" onClick={e => {e.preventDefault(); onEdit(artist)}}/>&nbsp;
                <MdOutlineRemoveCircle id="icon" onClick={e => {e.preventDefault(); onDelete(artist.artistID, artist.artistName)}}/>
            </td>
        </tr>
    );
}

export default Artist;