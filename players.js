var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');

class Players {

    get(from, where) {
        var l = [];
        console.log(from);

        var options = {
            url: from,
            headers: {
              'User-Agent': 'Mozilla/5.0'
            }
          };
          
        request(options, function (error, response, html) {
            var $ = cheerio.load(html);
            var details = {};
            var players = new Array();

            $('.hide-for-small .spielprofil_tooltip').each(function(i, elm) {
                var player = $(this).text();
                players.push(player);
                details[player] = new Array();
                console.log(player);
            });

            var features = 13, now_feature = 0, row=0;
            $('.responsive-table .items td').each(function(plnr, elm1) {
                    var data = $(this).text();
                    if (now_feature==features)
                    {
                        now_feature=0;
                        row++;
                    }
                    if (now_feature>3)
                        details[players[row]].push(data);
                    now_feature++;
            });

            
            fs.writeFile(where, JSON.stringify(details, null, 4), function(err) {
                if(err) {
                    return console.log(err);
                } else {
                    console.log("File where succesfully created!");
                }
            });
        });
    }
}

module.exports = Players;