CREATE TABLE artists (
    artistID int NOT NULL AUTO_INCREMENT,
    artistName varchar(145) NOT NULL,
    genre varchar(145) NOT NULL,
    label varchar(145) NOT NULL,
    PRIMARY KEY (artistID)
);


CREATE TABLE albums (
    albumID int NOT NULL AUTO_INCREMENT,
    albumTitle varchar(145) NOT NULL,
    releaseDate DATE NOT NULL,
    genre varchar(145) NOT NULL,
    artistID int NOT NULL,
    FOREIGN KEY (artistID) REFERENCES artists(artistID),
    PRIMARY KEY (albumID)
);


CREATE TABLE tracks (
    trackID int NOT NULL AUTO_INCREMENT,
    trackTitle varchar(145) NOT NULL,
    albumID int NOT NULL,
    releaseDate DATE NOT NULL,
    FOREIGN KEY (albumID) REFERENCES albums(albumID),
    PRIMARY KEY (trackID)
);


CREATE TABLE platforms (
    platformID int NOT NULL AUTO_INCREMENT,
    platformName varchar(145) NOT NULL,
    Country varchar(145) NOT NULL,
    PRIMARY KEY (platformID)
);


CREATE TABLE trackAvalability(
    platformID int NOT NULL,
    trackID int NOT NULL,
    URL varchar(145) NOT NULL,
    FOREIGN KEY (platformID) REFERENCES platforms(platformID),
    FOREIGN KEY (trackID) REFERENCES tracks(trackID)
);
