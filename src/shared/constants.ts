const ERR_MSG = {
  INVALID_ID: 'Provided ID is not valid. Provide ID in UUID format',
  USER_NOT_FOUND:
    'There is no such user with provided ID in database. Check your user ID one more time.',
  WRONG_PASS:
    "Current password doesn't match with provided password. Check field oldPassword, it must match with current password.",
  TRACK_NOT_FOUND:
    'There is no such track with provided ID in database. Check your track ID one more time.',
  ARTIST_NOT_FOUND:
    'There is no such artist with provided ID in database. Check your artist ID one more time.',
  ALBUM_NOT_FOUND:
    'There is no such album with provided ID in database. Check your album ID one more time.',
  ALBUM_REJECT:
    "You are trying to provide the albumId, that doesn't exist in database. Check albumId once more, or provide value null for albumId, or doen't include that field at all",
  ARTIST_REJECT:
    "You are trying to provide the artistId, that doesn't exist in database. Check artistId once more, or provide value null for artistId, or doen't include that field at all",
  NO_TRACK_FOR_FAVS:
    "You are trying to provide the trackId, that doesn't exist in database, while it must be in database in order to be added into favourites.",
  NO_ARTIST_FOR_FAVS:
    "You are trying to provide the artistId, that doesn't exist in database, while it must be in database in order to be added into favourites.",
  NO_ALBUM_FOR_FAVS:
    "You are trying to provide the albumId, that doesn't exist in database, while it must be in database in order to be added into favourites.",
  ARTIST_ALREADY_IN_FAVS:
    'You are trying to provide the artistId for the artist, that already in the favs.',
  ALBUM_ALREADY_IN_FAVS:
    'You are trying to provide the albumId for the album, that already in the favs.',
  TRACK_ALREADY_IN_FAVS:
    'You are trying to provide the trackId for the track, that already in the favs.',
  ARTIST_IN_FAVS_NOT_FOUND:
    'There is no such artist with provided ID in favourites. Check your artist ID one more time.',
  ALBUM_IN_FAVS_NOT_FOUND:
    'There is no such album with provided ID in favourites. Check your album ID one more time.',
  TRACK_IN_FAVS_NOT_FOUND:
    'There is no such track with provided ID in favourites. Check your track ID one more time.',
};

export { ERR_MSG };
