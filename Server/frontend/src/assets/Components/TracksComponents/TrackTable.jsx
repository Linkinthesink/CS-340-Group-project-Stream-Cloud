/*
TrackTable by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for TrackTable file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import Track from './Track';

function TrackTable({tracks, available, onDelete, onEdit}) {
    return (
        <>
            {tracks.map((track, i) => <Track track={track} available={available} onDelete={onDelete} onEdit={onEdit} key={track.trackID ?? i} />)}
        </>
    );
}

export default TrackTable;
