/*
App by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for App file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Platform({ platform, onDelete, onEdit}) {
    if (!platform) return null;

    return (
        <tr className='platform'>
            <td>{platform.platformName}</td>
            <td>{platform.country}</td>
            <td>

                <div class="tooltip-container">
                    <MdCreate id="icon" onClick={e => {e.preventDefault(); onEdit(platform)}}/>&nbsp;
                    <span class="tooltip-text">Edit</span>
                </div>
                <div class="tooltip-container">
                    <MdOutlineRemoveCircle id="icon" onClick={e => {e.preventDefault(); onDelete(platform.platformID, platform.platformName)}}/>
                    <span class="tooltip-text">Delete</span>
                </div>
            </td>
        </tr>
    );
}

export default Platform;
