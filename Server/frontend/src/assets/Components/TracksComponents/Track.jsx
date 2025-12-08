/*
Track by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for Track file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import '../../../App.css';
import {MdMusicVideo, MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Track({ track, available, onDelete, onEdit}) {
    if (!track) return null;

    return (
        <tr className='track'>
            <td>{track.albumTitle}</td>
            <td>{track.trackTitle}</td>
            <td>{track.releaseDate.split('T')[0]}</td>
            <td>
                <div class="tooltip-container">
                    <MdMusicVideo id="icon" onClick={e => {e.preventDefault(); available(track)}} style={{ fontSize: 38 }}/>&nbsp;
                    <span class="tooltip-text">Cehck Availability</span>
                </div>

            </td>
            <td>
                <div class="tooltip-container">
                    <MdCreate id="icon" onClick={e => {e.preventDefault(); onEdit(track)}}/>&nbsp;
                    <span class="tooltip-text">Edit</span>
                </div>
                <div class="tooltip-container">
                    <MdOutlineRemoveCircle id="icon" onClick={e => {e.preventDefault(); onDelete(track.trackID, track.trackTitle)}}/>
                    <span class="tooltip-text">Delete</span>
                </div>
            </td>
        </tr>
    );
}

export default Track;
