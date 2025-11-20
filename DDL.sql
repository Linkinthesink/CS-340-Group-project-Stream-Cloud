/*
Schema DDL by Brandon Vang and Jonathan Davis
Group 86 - Stream Cloud
Project Step 3
*/

DROP TABLE IF EXISTS trackAvailability;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS artists;

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

START TRANSACTION;

-- ========================================================
-- Table: artists
-- ========================================================

CREATE TABLE artists (
    artistID INT NOT NULL AUTO_INCREMENT,
    artistName VARCHAR(145) NOT NULL,
    genre VARCHAR(145) NOT NULL,
    label VARCHAR(145) NOT NULL,
    PRIMARY KEY (artistID)
);

INSERT INTO artists (artistID, artistName, genre, label) VALUES
(1, 'Taylor Swift', 'Pop', 'Republic Records'),
(2, 'Drake', 'Hip-Hop', 'OVO Sound'),
(3, 'Adele', 'Soul', 'Columbia Records'),
(4, 'Ed Sheeran', 'Pop', 'Atlantic Records'),
(5, 'Johnny Cash', 'Country Soul', 'Columbia Records');

-- ========================================================
-- Table: albums
-- ========================================================

CREATE TABLE albums (
    albumID INT NOT NULL AUTO_INCREMENT,
    albumTitle VARCHAR(145) NOT NULL,
    releaseDate DATE NOT NULL,
    genre VARCHAR(45) NOT NULL,
    artistID INT NOT NULL,
    PRIMARY KEY (albumID),
    KEY fk_album_artist_idx (artistID),
    CONSTRAINT fk_album_artist
        FOREIGN KEY (artistID) REFERENCES artists(artistID)
        ON UPDATE CASCADE
        ON DELETE CASCADE       
);

INSERT INTO albums (albumID, albumTitle, releaseDate, genre, artistID) VALUES
(1, '1989 (Taylor’s Version)', '2023-10-27', 'Pop', 1),
(2, 'Certified Lover Boy', '2021-09-03', 'Hip-Hop', 2),
(3, '30', '2021-11-19', 'Soul', 3),
(4, 'Divide', '2017-03-03', 'Pop', 4),
(5, 'Out Among the Stars', '2013-03-25', 'Country Soul', 5);

-- ========================================================
-- Table: platforms
-- ========================================================

CREATE TABLE platforms (
    platformID INT NOT NULL AUTO_INCREMENT,
    platformName VARCHAR(144) NOT NULL,
    country VARCHAR(144) NOT NULL,
    PRIMARY KEY (platformID)
);

INSERT INTO platforms (platformID, platformName, country) VALUES
(1, 'Spotify', 'Sweden'),
(2, 'Apple Music', 'United States'),
(3, 'YouTube Music', 'United States'),
(4, 'Tidal', 'United States');

-- ========================================================
-- Table: tracks
-- ========================================================

CREATE TABLE tracks (
    trackID INT NOT NULL AUTO_INCREMENT,
    trackTitle VARCHAR(145) NOT NULL,
    releaseDate DATE NOT NULL,
    albumID INT NOT NULL,
    PRIMARY KEY (trackID),
    KEY fk_track_album_idx (albumID),
    CONSTRAINT fk_track_album
        FOREIGN KEY (albumID) REFERENCES albums(albumID)
        ON UPDATE CASCADE
        ON DELETE CASCADE       
);

INSERT INTO tracks (trackID, trackTitle, releaseDate, albumID) VALUES
(1, 'Style', '2023-10-27', 1),
(2, 'Girls Want Girls', '2021-09-03', 2),
(3, 'Shape of You', '2017-03-03', 4),
(4, 'Easy On Me', '2021-11-19', 3),
(5, 'She Used to Love Me a Lot', '2013-03-25', 5);

-- ========================================================
-- Table: trackAvailability (M:N Intersection)
-- ========================================================

CREATE TABLE trackAvailability (
    platformID INT NOT NULL,
    trackID INT NOT NULL,
    url VARCHAR(145) NOT NULL,
    PRIMARY KEY (platformID, trackID),
    KEY fk_tA_track_idx (trackID),
    KEY fk_tA_platform_idx (platformID),
    CONSTRAINT fk_tA_platform
        FOREIGN KEY (platformID) REFERENCES platforms(platformID)
        ON UPDATE CASCADE
        ON DELETE CASCADE       
        ,
    CONSTRAINT fk_tA_track
        FOREIGN KEY (trackID) REFERENCES tracks(trackID)
        ON UPDATE CASCADE
        ON DELETE CASCADE      
);

INSERT INTO trackAvailability (platformID, trackID, url) VALUES
(1, 1, 'https://open.spotify.com/track/style'),
(1, 5, 'https://open.spotify.com/track/she-used-to-love-me-a-lot'),
(2, 1, 'https://music.apple.com/us/album/style'),
(4, 5, 'https://music.amazon.com/tracks/she-used-to-love-me-a-lot');

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
