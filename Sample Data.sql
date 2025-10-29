INSERT INTO artists (
    artistName,
    genre
)
VALUES
(
    "Jhonny cash",
    "Country"
),
(
    "Metalica",
    "Rock"
),
(
    "Michael Jackson",
    "Pop"
),
(
    "Informatoin Society",
    "Electronic"
),
(
    "Herbie Hancock",
    "Jazz"
);


INSERT INTO albums (
    albumTitle,
    releaseDate,
    genre,
    artistID
)
VALUES
(
    "Reload",
    '1997-01-01',
    "Rock",
    (SELECT artistID FROM artists WHERE artistName = "Metalica")
);


INSERT INTO tracks (
    trackTitle,
    albumID,
    releaseDate
)
VALUES
(
    "Fuel",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "The Memory Remains",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Devil's Dance",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "The Unforgiven II",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Better Than You",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Slither",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Carpe Diem Baby",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Bad Seed",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Where The Wild Things Are",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Prince Charming",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Low Man's Lyric",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "Attitude",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
),
(
    "FueFixxxerl",
    (SELECT albumID FROM albums WHERE albumTitle = "Reload"),
    '1997-01-01'
);


INSERT INTO platforms (
    platformName,
    Country
)
VALUES
(
    "Spotify",
    "Sweden"
),
(
    "Apple Music",
    "USA"
),
(
    "Youtube Music",
    "USA"
);


INSERT INTO trackAvalability (
    platformID,
    trackID,
    URL
)
VALUES
(
    (SELECT platformID FROM platforms WHERE platformName = "Spotify"),
    (SELECT trackID FROM tracks WHERE trackTitle = "Fuel"),
    "test.com"
);






