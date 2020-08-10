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

    static retrieveEpisodes (currentSeason, callback) {
        console.log("currentSeason", currentSeason);
        db.query(`SELECT * FROM greysanatomy WHERE season=${currentSeason}`, function (err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }
    // create query for milliseconds based on the seasons + episodes
}

module.exports = GreysAnatomy;