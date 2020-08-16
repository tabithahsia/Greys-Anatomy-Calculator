var express = require('express');
var GreysAnatomy = require('../models/greysanatomy');

var router = express.Router();

router.get('/seasons', function(req, res) {
    GreysAnatomy.retrieveSeasons((err, seasons) => {
        if (err) {
            return res.json(err);
        }
        return res.json(seasons);
    })
});

router.post('/episodes', function(req, res) {
    let currentSeason = req.body.currentSeason;

    GreysAnatomy.retrieveEpisodes(currentSeason, (err, episodes) => {
        if (err){
            return res.json(err);
        }
        return res.json(episodes);
    });
});

router.post('/timeYouveSpent', function(req, res){
    let currentSeason = req.body.season;
    let currentEpisode = req.body.episode;

    GreysAnatomy.timeYouveSpent(currentSeason, currentEpisode, (err, sum) => {
        if (err) {
            return res.json(err);
        }
        return res.json(sum);
    })
})

router.post('/timeLeft', function(req, res){
    let currentSeason = req.body.season;
    let currentEpisode = req.body.episode;

    GreysAnatomy.timeLeft(currentSeason, currentEpisode, (err, sum) => {
        if (err) {
            return res.json(err);
        }
        return res.json(sum);
    })})


module.exports = router;