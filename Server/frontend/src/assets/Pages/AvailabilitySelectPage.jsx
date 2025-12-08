/*
AvailabilitySelectPage by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for AvailabilitySelectPage file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AvailabilitySelectTable from '../Components/AvailabilityComponents/AvailabilitySelectTable';

export function AvailabilitySelectPage ({ backendURL }) {
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch((backendURL) + '/tracks');
            const { tracks } = await response.json();
            setTracks(tracks || []);
        } catch (err) {
            console.error('Failed to fetch tracks', err);
        }
    };

    useEffect(() => { getData(); }, []);


    const available = (track) => {
        navigate('/availability', { state: track });
    };


    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Select Track to view availability </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AvailabilitySelectTable tracks={tracks} available={available} />
                    </tbody>
                </table>
            </div>
        </>
    );
}
