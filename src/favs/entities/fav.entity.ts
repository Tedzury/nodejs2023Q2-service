export class Fav {
  artists: string[];
  albums: string[];
  tracks: string[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  getAllFavourites() {
    const artists =
      this.artists.length > 0
        ? `Favourite artists IDs: ${this.artists.join(', ')}.`
        : 'No favourite artists yet';
    const albums =
      this.albums.length > 0
        ? `Favourite albums IDs: ${this.albums.join(', ')}.`
        : 'No favourite albums yet';
    const tracks =
      this.tracks.length > 0
        ? `Favourite tracks IDs: ${this.tracks.join(', ')}.`
        : 'No favourite tracks yet';
    return `
    ${artists}
    ${albums}
    ${tracks}
    `;
  }

  getArtistById(artistId: string) {
    return this.artists.find((_artistId) => _artistId === artistId);
  }
  addArtist(artistId: string) {
    this.artists.push(artistId);
  }
  removeArtist(artistId: string) {
    this.artists = this.artists.filter((_artistId) => _artistId !== artistId);
  }

  getAlbumById(albumId: string) {
    return this.albums.find((_albumId) => _albumId === albumId);
  }
  addAlbum(albumId: string) {
    this.albums.push(albumId);
  }
  removeAlbum(albumId: string) {
    this.albums = this.albums.filter((_albumId) => _albumId !== albumId);
  }

  getTrackById(trackId: string) {
    return this.tracks.find((_trackId) => _trackId === trackId);
  }
  addTrack(trackId: string) {
    this.tracks.push(trackId);
  }
  removeTrack(trackId: string) {
    this.tracks = this.tracks.filter((_trackId) => _trackId !== trackId);
  }
}
