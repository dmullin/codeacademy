import SearchBar from "../components/SearchBar/SearchBar";

const clientId = '61abc7f29d9047f5ab69501013755162';
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenArray = window.location.href.match(/access_token=([^&]*)/);
        const expiresInArray = window.location.href.match(/expires_in([^&]*)/);
        if (accessTokenArray && expiresInArray) {
            accessToken = acessTokenArray[1];
            console.log('get method finds' + accessToken);
            const expiresIn = Number(expiresInArray[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect=${redirectURI}`
            window.location.accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`
        return fetch(urlToFetch, {
            headers: {
                Authorization: 'Bearer ${accessToken}'
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
    }

};

export default Spotify;