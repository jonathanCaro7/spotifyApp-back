const async = require('async');
const axios = require('axios')
const querystring = require('querystring');

var Album = require('../models/album');

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
        const offset = req.query.offset || 0;

        axios.get(
            `https://api.spotify.com/v1/search?${querystring.stringify({ query: req.query.album, type: 'album', limit: 12, offset })}`,
            { headers: { Authorization: authorization_token } }
        ).then((response) => {
            res.json(response.data.albums);
  
            async.forEachOf(response.data.albums.items, function(item, index, callback) {
                const album = new Album(item);
                album.save(function(err) {
                    callback(err);
                });
            }, function(err) {
                if (err) console.log(err);
            });
        })
        .catch((error) => {
          res.sendStatus(400);
        })
	}
};