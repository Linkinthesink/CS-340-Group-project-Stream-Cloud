import '../../../App.css';
import {MdMusicVideo, MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function AvailabilitySelect({ track, available}) {
    if (!track) return null;

    return (
        <tr className='availability-row'>
            <td id="availabilitySelect" onClick={e => {e.preventDefault(); available(track)}}>{track.trackTitle}</td>
        </tr>
    );
}

export default AvailabilitySelect;
