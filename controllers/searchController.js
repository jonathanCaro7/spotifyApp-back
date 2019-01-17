var router = require('express').Router();
var Album = require('../models/album');

module.exports = {
	query: function(req, res) {
        res.json({ state: 1, msg: 'test' });
	}
};