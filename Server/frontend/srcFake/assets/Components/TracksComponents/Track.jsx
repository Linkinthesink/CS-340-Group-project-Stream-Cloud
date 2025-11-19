import '../../../App.css';
import {MdMusicVideo, MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Track({ track, available, onDelete, onEdit}) {
    if (!track) return null;

    return (
        <tr className='track'>
            <td>{track.albumTitle || ''}</td>
            <td>{track.trackTitle}</td>
            <td>{track.releaseDate}</td>
            <td>Available on<MdMusicVideo onClick={e => {e.preventDefault(); available(track)}}/>&nbsp;</td>
            <td>
                <MdCreate onClick={e => {e.preventDefault(); onEdit(track)}}/>&nbsp;
                <MdOutlineRemoveCircle onClick={e => {e.preventDefault(); onDelete(track.trackID, track.trackTitle)}}/>
            </td>
        </tr>
    );
}

export default Track;
