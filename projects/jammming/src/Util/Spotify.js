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
    }

};

export default Spotify;