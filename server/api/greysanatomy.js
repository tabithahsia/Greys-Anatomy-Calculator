var express = require('express');
var GreysAnatomy = require('../models/greysanatomy');

var router = express.Router();

router.get('/', function(req, res) {
    GreysAnatomy.retrieveSeasons(function(err, seasons) {
        if (err) {
            return res.json(err);
        }
        return res.json(seasons);
    })
});

module.exports = router;