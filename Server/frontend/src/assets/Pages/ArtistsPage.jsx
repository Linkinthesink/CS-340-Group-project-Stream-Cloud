import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import ArtistTable from '../Components/ArtistComponents/ArtistTable';


function ArtistsPage({ backendURL, setArtistToEdit }) {

    // Set up a state variable `people` to store and display the backend response
    const [artists, setArtist] = useState([]);


    const getData = async function () {
        try {
            console.log("Fetching artists data...");
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/artists');
            
            // Convert the response into JSON format
            const {artist} = await response.json();
    
            // Update the people state with the response data
            setArtist(artist);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }

    };


    const onDelete = async(id, name) =>{
        if(window.confirm("Are you sure you want to delete?")){     //confimation popup to prevent accidental misclicks 
            const response = await fetch(
                backendURL + '/artists/' + id, 
                {method: 'DELETE'}
            );
            if(response.status === 204){
                setArtist(artists.filter(e => e.artistID !== id))
                alert(`Deleted artist ${name}, id: ${id}`)
            } else{
                alert(`failed to delete artist ${name}, id: ${id} `)
            }
        }
    }

    const navigate = useNavigate();
    const onEdit = (artist) =>{
        // pass the artist via route state to avoid timing issues with setState + navigate
        navigate('/artist/edit', { state: artist });
    }


    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div class="table-container">
                <table class="page">
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Genre</th>
                            <th>Label</th>
                            <th>
                                <Link to="/artist/add">
                                <button>Add</button>
                                </Link>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    <ArtistTable artists={artists} onDelete={onDelete} onEdit={onEdit}></ArtistTable>
                    </tbody>
                </table>
            </div>

               
        </>
    );
}
export { ArtistsPage };