import Platform from './Platform';

function PlatformTable({platforms, onDelete, onEdit}) {
    return (
        <>
            {platforms.map((platform, i) => <Platform platform={platform} onDelete={onDelete} onEdit={onEdit} key={platform.platformID ?? i} />)}
        </>
    );
}

export default PlatformTable;
