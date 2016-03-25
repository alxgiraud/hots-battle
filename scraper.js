var cheerio = require('cheerio');

exports.getJSON = function (html, callbackScraper) {

    var obj = {
        map: '',
        winner: 0, // winner is always the first team displayed on hotslogs
        teams: [
            {
                mmr: 0,
                heroes: []
            },
            {
                mmr: 0,
                heroes: []
            }
        ]
    };

    var $ = cheerio.load(html);

    $('h3').filter(function () {
        obj.map = $(this).text();
    });

    $('#MatchSummary_RadGridMatchDetails > .rgMasterTable > tbody > tr').each(function () {
        var i = (obj.teams[0].heroes.length < 5) ? 0 : 1;

        if ($(this).attr('class') === 'rgGroupHeader') {
            var mmr = $(this).find('td:nth-child(2)').text();
            obj.teams[i].mmr = parseInt(mmr.match(/(\d+)/)[0], 10);

        } else {
            var hero = $(this).find('td:nth-child(4) > a').text();
            if (hero) {
                obj.teams[i].heroes.push(hero);
            }
        }
    });


    if (Math.random() < 0.5) { //randomly swap the team of the winner
        var tmp = obj.teams[0];
        obj.teams[0] = obj.teams[1];
        obj.teams[1] = tmp;
        obj.winner = 1;
    }

    callbackScraper(JSON.stringify(obj, null, 4));
};
