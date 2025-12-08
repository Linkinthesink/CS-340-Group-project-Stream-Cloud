/*
AlbumTable by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AlbumTable file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import Album from './Album';

function AlbumTable({albums, onDelete, onEdit}) {
    return (
        <>
            {albums.map((album, i) => <Album album={album} onDelete={onDelete} onEdit={onEdit} key={album.albumID ?? i} />)}
        </>
    );
}

export default AlbumTable;
