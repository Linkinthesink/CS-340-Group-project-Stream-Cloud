import Availability from './Avalablility';

function AvailabilityTable({ availabilities }) {
    return (
        <>
            {availabilities.map((availability, i) => <Availability availability={availability} key={availability.platformID ?? i} />)}
        </>
    );
}

export default AvailabilityTable;
