const clientID = '61abc7f29d9047f5ab69501013755162';
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenArray = window.location.href.match(/access_token=([^&]*)/);
        const expiresInArray = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenArray && expiresInArray) {
            accessToken = accessTokenArray[1];
            const expiresIn = Number(expiresInArray[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`
        return fetch(urlToFetch, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        let accessToken = Spotify.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userID;
        let playlistID;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
        

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => {
                return response.json(); 
            }).then(jsonResponse => {
                playlistID = jsonResponse.id;

                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                });
            });
        });
    }

};

export default Spotify;