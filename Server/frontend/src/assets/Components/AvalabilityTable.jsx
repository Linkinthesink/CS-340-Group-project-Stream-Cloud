import Availability from './Avalablility';

function AvailabilityTable({ availabilities, onEdit, onDelete }) {
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
