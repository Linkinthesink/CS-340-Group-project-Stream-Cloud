/*
AvailabilityTable by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AvailabilityTable file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import Availability from './Avalablility';

function AvailabilityTable({ availabilities, onEdit, onDelete }) {
    if (!availabilities || availabilities.length === 0) {
        return (
            <tr>
                <td colSpan="3">No availabilities found.</td>
            </tr>
        );
    }
    return (
        <>
            {availabilities.map((availability, i) => (
                <Availability
                    availability={availability}
                    key={availability.platformID ?? i}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
}

export default AvailabilityTable;
