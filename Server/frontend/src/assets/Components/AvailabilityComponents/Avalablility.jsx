import '../../../App.css';
import {MdCreate ,  MdOutlineRemoveCircle } from 'react-icons/md';

function Availability({ availability, onEdit, onDelete }) {
    return (
        <tr className='availability'>
            <td>{availability.platformName}</td>
            <td>{availability.url}</td>
            <td>
                <MdCreate id="icon" onClick={e => { e.preventDefault(); onEdit && onEdit(availability); }} />&nbsp;
                <MdOutlineRemoveCircle id="icon" onClick={e => { e.preventDefault(); onDelete && onDelete(availability.platformID, availability.platformName || availability.url); }} />
            </td>
        </tr>
    );
}

export default Availability;
