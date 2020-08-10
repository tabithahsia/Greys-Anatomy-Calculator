var express = require('express');
var GreysAnatomy = require('../models/greysanatomy');

var router = express.Router();

router.get('/seasons', function(req, res) {
    GreysAnatomy.retrieveSeasons(function(err, seasons) {
        if (err) {
            return res.json(err);
        }
        return res.json(seasons);
    })
});

router.get('/episodes', function(req, res) {
    GreysAnatomy.retrieveEpisodes(function(err, episodes) {
        if (err){
            return res.json(err);
        }
        return res.json(episodes);
    })
});

module.exports = router;