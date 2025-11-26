import Track from './AvailabilitySelect';

function AvailabilitySelectTable({tracks, available}) {
    return (
        <>
            {tracks.map((track, i) => <Track track={track} available={available} key={track.trackID ?? i} />)}
        </>
    );
}

export default AvailabilitySelectTable;
