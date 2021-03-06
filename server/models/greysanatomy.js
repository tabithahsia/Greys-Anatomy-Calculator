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
        db.query(`SELECT * FROM greysanatomy WHERE season=${currentSeason}`, function (err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }

    static timeSpent(season, episode, callback) {
        db.query(`SELECT SUM(length) FROM greysanatomy WHERE (season=${season} AND episode <=${episode}) OR (season<${season})`, function(err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }

    static timeLeft(season, episode, callback) {
        db.query(`SELECT SUM(length) FROM greysanatomy WHERE (season=${season} AND episode > ${episode}) OR (season>${season})`, function(err, res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        })
    }
}

module.exports = GreysAnatomy;