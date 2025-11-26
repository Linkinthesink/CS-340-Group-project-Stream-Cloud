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
