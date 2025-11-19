import '../../App.css';

function Availability({ availability }) {
    if (!availability) return null;

    return (
        <tr className='availability'>
            <td>{availability.platformName}</td>
            <td>{availability.url}</td>
        </tr>
    );
}

export default Availability;
