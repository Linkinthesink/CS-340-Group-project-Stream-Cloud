/*
Availability by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for Availability file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Availability({ availability, onEdit, onDelete }) {
    return (
        <tr className='availability'>
            <td>{availability.platformName}</td>
            <td>{availability.url}</td>
            <td>
                <div class="tooltip-container">
                    <MdCreate id="icon" onClick={e => {e.preventDefault(); onEdit(availability)}}/>&nbsp;
                    <span class="tooltip-text">Edit</span>
                </div>
                <div class="tooltip-container">
                    <MdOutlineRemoveCircle id="icon" onClick={e => {e.preventDefault(); onDelete(availability.platformID, availability.platformName)}}/>
                    <span class="tooltip-text">Delete</span>
                </div>
            </td>
        </tr>
    );
}

export default Availability;
