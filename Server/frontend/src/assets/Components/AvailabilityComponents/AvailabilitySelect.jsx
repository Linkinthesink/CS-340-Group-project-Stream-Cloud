/*
AvailabilitySelect by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AvailabilitySelect file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import '../../../App.css';

function AvailabilitySelect({ track, available}) {
    if (!track) return null;

    return (
        <tr className='availability-row'>
            <td id="availabilitySelect" onClick={e => {e.preventDefault(); available(track)}}>{track.trackTitle}</td>
        </tr>
    );
}

export default AvailabilitySelect;
