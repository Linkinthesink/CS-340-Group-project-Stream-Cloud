/*
ArtistTable by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for ArtistTable file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import Artist from './Artist';

function ArtistTable({artists, onDelete, onEdit}) {
    return (
        <>
            {artists.map((artist, i) => <Artist artist={artist} 
                  onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </>

    );
}

export default ArtistTable;