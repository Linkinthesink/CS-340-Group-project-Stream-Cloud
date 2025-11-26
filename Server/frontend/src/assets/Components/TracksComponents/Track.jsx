import '../../../App.css';
import {MdMusicVideo, MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Track({ track, available, onDelete, onEdit}) {
    if (!track) return null;

    return (
        <tr className='track'>
            <td>{track.albumTitle}</td>
            <td>{track.trackTitle}</td>
            <td>{track.releaseDate.split('T')[0]}</td>
            <td><MdMusicVideo id="icon" onClick={e => {e.preventDefault(); available(track)}} style={{ fontSize: 38 }}/>&nbsp;</td>
            <td>
                <MdCreate id="icon" onClick={e => {e.preventDefault(); onEdit(track)}}/>&nbsp;
                <MdOutlineRemoveCircle id="icon" onClick={e => {e.preventDefault(); onDelete(track.trackID, track.trackTitle)}}/>
            </td>
        </tr>
    );
}

export default Track;
