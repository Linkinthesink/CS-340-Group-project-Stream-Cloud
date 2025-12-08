/*
HomePage by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for HomePage file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai Used for autofill suggestions, reviewed and modified by authors --
*/

// Import logo images
import logoDark from '../Images/Logo-Dark.png'
import logoLight from '../Images/Logo-Light.png'
// Logos made by Jonathan Davis using Inkscape

export function HomePage({ backendURL }){


    const onReset = async () => {
        if (!window.confirm(`Reset Database?`)) return;
        try {
            console.log("sent reset request")
            console.log(backendURL)
            const response = await fetch((backendURL ? backendURL : '') + '/reset');
            if (response.status === 200) {
                alert(`Reset Database`);
            } else {
                alert('Failed to reset database');
            }
        } catch (err) {
            console.error(err);
            alert('Reset failed');
        }
    };

    // Function to check if dark mode is enabled used for logo selection
    function isDarkModeEnabled() {
        if (window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false; 
    }

    return (
        <div class="Homepage">    

                <div class="container">
                    <div id="logobox">
                        <img src={isDarkModeEnabled() ? logoDark : logoLight} alt="Stream Cloud" id="logo"></img>
                    </div>
                    <h2><b>About:</b> </h2>
                    <p>The Stream Cloud is a database management system that is designed to organize and connect
                    information about artists, albums, and tracks across multiple streaming platforms.</p>
                </div>
                <button id="reset" onClick={e => {e.preventDefault(); onReset()}}> Reset DB </button>
        </div>
    );
  }
