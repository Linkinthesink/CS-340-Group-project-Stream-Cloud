import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Platform({ platform, onDelete, onEdit}) {
    if (!platform) return null;

    return (
        <tr className='platform'>
            <td>{platform.platformName}</td>
            <td>{platform.country}</td>
            <td>
                <MdCreate onClick={e => {e.preventDefault(); onEdit(platform)}}/>&nbsp;
                <MdOutlineRemoveCircle onClick={e => {e.preventDefault(); onDelete(platform.platformID, platform.platformName)}}/>
            </td>
        </tr>
    );
}

export default Platform;
