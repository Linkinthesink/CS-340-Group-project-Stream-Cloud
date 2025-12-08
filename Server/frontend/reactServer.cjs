/*
reactServer by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
12/5/2025
-- Citation for reactServer file based on template provided here: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131 --
-- Ai was not used --
*/

const express = require('express');
const path = require('path');
const app = express();

// We will simply hardcode the react PORT, but normally this should be inside .env
const PORT = 9995;

// Serve the static files from the React app located in the build folder '/dist'
// React router will take over frontend routing
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});