const db = require('../database');

class GreysAnatomy {
    static retrieveSeasons (callback) {
        db.query('SELECT DISTINCT season FROM greysanatomy ORDER BY season', function (err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }

    static retrieveEpisodes (callback) {
        db.query('SELECT * FROM greysanatomy', function (err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }

    // create query for episodes based on seasons
    // create query for milliseconds based on the seasons + episodes
}

module.exports = GreysAnatomy;