import Album from './Album';

function AlbumTable({albums, onDelete, onEdit}) {
    return (
        <>
            {albums.map((album, i) => <Album album={album} onDelete={onDelete} onEdit={onEdit} key={album.albumID ?? i} />)}
        </>
    );
}

export default AlbumTable;
