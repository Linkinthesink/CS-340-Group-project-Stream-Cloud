/*
DML by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
11/6/2025
*/ 
-- Citation for DML file based on : bsg_sample_data_manipulation_queries.sql


-- ARTISTS QUERIES ------------------------------------------------------

-- get all artist IDs and Names to populate Artist dropdown
Select artistID, artistName from artists;

-- add new artist
INSERT INTO artists (artistName, genre, label)
VALUES(@artistName, @genre, @label);

-- edit an artist based on form
UPDATE artists
SET label = :labelInput
WHERE id = artistID from_update form;

-- delete artist
DELETE FROM artists WHERE id = :artist_ID_selected_from_cert;



-- ALBUMS QUERIES ------------------------------------------------------

-- list all albums
SELECT * from albums;

-- add new album
INSERT INTO albums (albumTitle, releaseDate, genre, artistID)
VALUES(@albumTitle, @releaseDate, @genre, @artistID);

-- edit an album based on form
UPDATE albums
SET albumTitle = :albumTitleInput
WHERE albumTitle = @album_name_input from_update form;

-- delete album
DELETE FROM albums WHERE id = :artist_ID_selected_from_cert;

-- list albums information + artist name
SELECT 
    albums.albumID,
    albums.albumTitle,
    albums.releaseDate,
    albums.genre,
    artists.artistName
FROM albums
JOIN artists ON albums.artistID = artists.artistID;

-- TRACKS QUERIES ------------------------------------------------------

-- list all tracks
SELECT * from tracks;

-- add new album
INSERT INTO tracks (trackTitle, releaseDate, albumID)
VALUES(@trackTitle_input, @releaseDate_input, @albumID);

-- edit an album based on form
UPDATE tracks
SET trackTitle = :trackTitleInput
WHERE trackTitle = @track_name_input from_update form;

-- delete album
DELETE FROM tracks WHERE trackTitle = @track_name_input;

-- lists tracks with title, release date, album, and artist name
SELECT
    tracks.trackID,
    tracks.trackTitle,
    tracks.releaseDate,
    albums.albumTitle,
    artists.artistName
FROM tracks
JOIN albums ON tracks.albumID = albums.albumID
JOIN artists ON albums.artistID = artists.artistID;

-- PLATFORM QUERIES ------------------------------------------------------

-- list all platform IDs and Names
SELECT platformID, platformName FROM platforms;

-- add new platform
INSERT INTO platforms (platformName, country)
VALUES(:platformNameInput, :countryInput);

-- update a platform's data
UPDATE platforms
SET platformName = platforName = :platformNameInput, country = :countryInput
WHERE platformID = @platformID_from_update_form;

-- delete a platform
DELETE FROM platforms WHERE platformID = @platformID_from_update_form;

-- PLATFORM QUERIES ------------------------------------------------------

-- list all platform IDs and Names
SELECT platformID, platformName FROM platforms;

-- add new platform
INSERT INTO platforms (platformName, country)
VALUES(:platformNameInput, :countryInput);

-- update a platform's data
UPDATE platforms
SET platformName = platforName = :platformNameInput, country = :countryInput
WHERE platformID = @platformID_from_update_form;

-- delete a platform
DELETE FROM platforms WHERE platformID = @platformID_from_update_form;

-- TRACKAVAILABILITY QUERIES ------------------------------------------------------

-- shows all platform-track combinations with URLs
SELECT * FROM trackAvailability;

-- associate a Track with a Platform
INSERT INTO trackAvailability (platformID, trackID, url)
VALUES (:platformID_from_dropdown_Input, :trackID_from_dropdown_Input, :urlInput);

-- update track availability information
UPDATE trackAvailability
SET platformID = :platformID_from_dropdown_Input, trackID = :trackID_from_dropdown_input,
    url = :urlInput
WHERE platformID = :old_platformID_selected_from_list AND trackID = :old_trackID_selected_from_list;

-- delete a track from trackAvailability
DELETE FROM trackAvailability WHERE trackID = :trackID_from_dropdown_input AND platformID = platformID_from_dropdown_input;

-- shows platform name, track title, album title, artists name, url
SELECT
    trackAvailability.platformID,
    platforms.platformName,
    trackAvailability.trackID,
    tracks.trackTitle,
    albums.albumTitle,
    artists.artistName,
    trackAvailability.url
FROM trackAvailability
JOIN platforms ON trackAvailability.platformID = platforms.platformID
JOIN tracks ON trackAvailability.trackID = tracks.trackID
JOIN albums ON tracks.albumID = albums.albumID
JOIN artists ON albums.artistID = artists.artistID;


