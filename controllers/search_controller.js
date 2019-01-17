const axios = require('axios')
const querystring = require('querystring');

var authorization_token;

axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({ grant_type: 'client_credentials'}),
    { headers: { Authorization: 'Basic NmNlMjg2YmFjMmQ1NDc3NTg5ZGJmNDA1YTAyMWVjZmE6OWQ5YTA2NmU5MzIxNDcyOWFiYTUzYzViYzAyMTdkNjk=' } }
)
.then((res) => {
  authorization_token = `${res.data.token_type} ${res.data.access_token}`;
})
.catch((error) => {
  console.error(error);
});

module.exports = {
	query: function(req, res) {
        axios.get(
            `https://api.spotify.com/v1/search?${querystring.stringify({ query: req.query.album, type: 'album' })}`,
            { headers: { Authorization: authorization_token } }
        ).then((response) => {
          res.json(response.data.albums);
        })
        .catch((error) => {
          res.sendStatus(400);
        })
	}
};