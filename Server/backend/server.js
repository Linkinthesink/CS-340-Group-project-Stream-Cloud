// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 8885;

// Default root route to show server status
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend server is running' });
});

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/artists', async (req, res) => {
    try {
        const query1 = `SELECT artists.artistID, artists.artistName, artists.genre, artists.label FROM artists;`;
        const [artist] = await db.query(query1);
        res.status(200).json({ artist });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});


app.post('/artists', async (req, res) => {
    try {
        body = req.body;

        const query1 = `INSERT INTO artists (artistName, genre, label) VALUES
        ('${body.name}', '${body.genre}', '${body.label}');`;
        const [artist] = await db.query(query1);
        res.status(201).json({ artist });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});


app.get('/artists/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query1 = `SELECT * FROM artists WHERE artistID = ?;`;
        const [rows] = await db.query(query1, [id]);
        res.status(200).json({ artist: rows });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});


app.put('/artists/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        // Create and execute our queries
        const query1 = `
        UPDATE artists
        SET artistName = ?, genre = ?, label = ?
        WHERE artistID = ?;`;
        const [rows] = await db.query(query1, [body.artistName, body.genre, body.label, id]);
        res.status(200).json({ artist: rows });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});


app.delete('/artists/:id', async (req, res) => {
    try {
        console.log("got delete request");
        let id = req.params.id; 
        id = id.replace(":", "");  // Remove leading colon if present
        console.log(id);    
        const query1 = `DELETE FROM artists WHERE artistID = ?;`;
        const [result] = await db.query(query1, [id]);
        console.log(result);
        // Return 204 No Content on success
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Artist not found' });
        }

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ########################################
// ########## ALBUM ROUTES

// GET all albums
app.get('/albums', async (req, res) => {
    try {
        const query = 
        `SELECT albums.albumID, albums.albumTitle, albums.releaseDate, albums.genre, albums.artistID, artists.artistName FROM albums 
         LEFT OUTER JOIN artists ON albums.artistID = artists.artistID;`;
        const [rows] = await db.query(query);
        res.status(200).json({ albums: rows });
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// CREATE album
app.post('/albums', async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO albums (albumTitle, releaseDate, genre, artistID) VALUES (?, ?, ?, ?);`;
        const [result] = await db.query(query, [body.albumTitle, body.releaseDate, body.genre, body.artistID]);
        res.status(201).json({ insertedId: result.insertId });
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// GET album by id
app.get('/albums/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `
        SELECT * FROM albums
        JOIN artists ON albums.artistID = artists.artistID
        WHERE albumID = ?
        ;`;
        const [rows] = await db.query(query, [id]);
        res.status(200).json({ album: rows });
    } catch (error) {
        console.error('Error fetching album:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// UPDATE album
app.put('/albums/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const query = `UPDATE albums SET albumTitle = ?, releaseDate = ?, genre = ?, artistID = ? WHERE albumID = ?;`;
        const [result] = await db.query(query, [body.albumTitle, body.releaseDate, body.genre, body.artistID, id]);
        if (result.affectedRows > 0) res.status(200).json({ updated: true });
        else res.status(404).json({ error: 'Album not found' });
    } catch (error) {
        console.error('Error updating album:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// DELETE album
app.delete('/albums/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM albums WHERE albumID = ?;`;
        const [result] = await db.query(query, [id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).json({ error: 'Album not found' });
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// ########################################
// ########## TRACK ROUTES

// GET all tracks
app.get('/tracks', async (req, res) => {
    try {
        // Include album title via LEFT JOIN in case a track has an album reference
        const query = `SELECT tracks.trackID, tracks.trackTitle, tracks.releaseDate, tracks.albumID, albums.albumTitle
                       FROM tracks
                       LEFT JOIN albums ON tracks.albumID = albums.albumID;`;
        const [rows] = await db.query(query);
        res.status(200).json({ tracks: rows });
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// CREATE track
app.post('/tracks', async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO tracks (albumID, trackTitle, releaseDate) VALUES (?, ?, ?);`;
        const [result] = await db.query(query, [body.albumID, body.trackTitle, body.releaseDate]);
        res.status(201).json({ insertedId: result.insertId });
    } catch (error) {
        console.error('Error creating track:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// GET track by id
app.get('/tracks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM tracks WHERE trackID = ?;`;
        const [rows] = await db.query(query, [id]);
        res.status(200).json({ track: rows });
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// GET track availability by id
app.get('/tracks-availability/:id', async (req, res) => {
    try {
        console.log("Received request for track availability");
        const id = req.params.id;
        const query = `SELECT tracks.trackID, tracks.trackTitle, tracks.releaseDate, platforms.platformID, platforms.platformName, platforms.country, trackAvailability.url
                   FROM tracks
                   JOIN trackAvailability trackAvailability ON tracks.trackID = trackAvailability.trackID
                   JOIN platforms ON trackAvailability.platformID = platforms.platformID
                   WHERE tracks.trackID = ?;`;
        const [rows] = await db.query(query, [id]);
        console.log(rows);
        res.status(200).json({ track: rows });
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// UPDATE track availability (url) by trackID and platformID
app.put('/tracks-availability/:trackID/:platformID', async (req, res) => {
    try {
        const { trackID, platformID } = req.params;
        const body = req.body;
        const query = `UPDATE trackAvailability SET url = ? WHERE trackID = ? AND platformID = ?;`;
        const [result] = await db.query(query, [body.url, trackID, platformID]);
        if (result.affectedRows > 0) res.status(200).json({ updated: true });
        else res.status(404).json({ error: 'Track availability not found' });
    } catch (error) {
        console.error('Error updating track availability:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// DELETE track availability by trackID and platformID
app.delete('/tracks-availability/:trackID/:platformID', async (req, res) => {
    try {
        const { trackID, platformID } = req.params;
        const query = `DELETE FROM trackAvailability WHERE trackID = ? AND platformID = ?;`;
        const [result] = await db.query(query, [trackID, platformID]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).json({ error: 'Track availability not found' });
    } catch (error) {
        console.error('Error deleting track availability:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// UPDATE track
app.put('/tracks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const query = `UPDATE tracks SET albumID = ?, trackTitle = ?, releaseDate = ? WHERE trackID = ?;`;
        const [result] = await db.query(query, [body.albumID, body.trackTitle, body.releaseDate, id]);
        if (result.affectedRows > 0) res.status(200).json({ updated: true });
        else res.status(404).json({ error: 'Track not found' });
    } catch (error) {
        console.error('Error updating track:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// DELETE track
app.delete('/tracks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM tracks WHERE trackID = ?;`;
        const [result] = await db.query(query, [id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).json({ error: 'Track not found' });
    } catch (error) {
        console.error('Error deleting track:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// ########################################
// ########## PLATFORM ROUTES

// GET all platforms
app.get('/platforms', async (req, res) => {
    try {
        const query = `SELECT platformID, platformName, country FROM platforms;`;
        const [rows] = await db.query(query);
        res.status(200).json({ platforms: rows });
    } catch (error) {
        console.error('Error fetching platforms:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// CREATE platform
app.post('/platforms', async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO platforms (platformName, country) VALUES (?, ?);`;
        const [result] = await db.query(query, [body.platformName, body.country]);
        res.status(201).json({ insertedId: result.insertId });
    } catch (error) {
        console.error('Error creating platform:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// GET platform by id
app.get('/platforms/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM platforms WHERE platformID = ?;`;
        const [rows] = await db.query(query, [id]);
        res.status(200).json({ platform: rows });
    } catch (error) {
        console.error('Error fetching platform:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// UPDATE platform
app.put('/platforms/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const query = `UPDATE platforms SET platformName = ?, country = ? WHERE platformID = ?;`;
        const [result] = await db.query(query, [body.platformName, body.country, id]);
        if (result.affectedRows > 0) res.status(200).json({ updated: true });
        else res.status(404).json({ error: 'Platform not found' });
    } catch (error) {
        console.error('Error updating platform:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

// DELETE platform
app.delete('/platforms/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM platforms WHERE platformID = ?;`;
        const [result] = await db.query(query, [id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).json({ error: 'Platform not found' });
    } catch (error) {
        console.error('Error deleting platform:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
