import Track from './Track';

function TrackTable({tracks, available, onDelete, onEdit}) {
    return (
        <>
            {tracks.map((track, i) => <Track track={track} available={available} onDelete={onDelete} onEdit={onEdit} key={track.trackID ?? i} />)}
        </>
    );
}

export default TrackTable;
