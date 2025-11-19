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