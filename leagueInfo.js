var fs = require('fs');
const Rater = require('./rater.js');

class LeagueInfo {

    constructor(where){
        var contents = fs.readFileSync(where + "_config.json");
        this.l = JSON.parse(contents);
        this.where = where;
    } 
    
    processAll(){
        for (var i in this.l)
        {
            var rater = new Rater(this.where + this.l[i]);
            rater.process();
        }
    }

    rateAll() {
        for (var i in this.l)
        {
            var rater = new Rater(this.where + this.l[i]);
            var contents = fs.readFileSync(this.where + "_limits.json");
            var limits = JSON.parse(contents);
            rater.rate(limits);
        }
    }

    setLimits() {
        var av=0, nr=0;
        for (var i in this.l)
        {
            var rater = new Rater(this.where + this.l[i]);
            var x = rater.getValueAverage(0);
            av+=x;
            nr++;
        }
        console.log("limit1: " + 0);
        console.log("limit2: " + av/nr/2);
        console.log("limit3: " + av/nr);
        
        var av2=0, nr2=0;
        for (var i in this.l)
        {
            var rater = new Rater(this.where + this.l[i]);
            var x = rater.getValueAverage(av/nr);
            av2+=x;
            if (x!=0)
                nr2++;
        }
        console.log("limit4: " + av2/nr2);

        var av3=0, nr3=0;
        for (var i in this.l)
        {
            var rater = new Rater(this.where + this.l[i]);
            var x = rater.getValueAverage(av2/nr2);
            av3+=x;
            if (x!=0)
                nr3++;
        }
        console.log("limit5: " + av3/nr3);
        var limit =[0, av/nr/2, av/nr, av2/nr2, av3/nr3];
        fs.writeFile(this.where + "_limits.json", JSON.stringify(limit, null, 4), function(err) {
            if(err) {
                return console.log(err);
            } else {
                console.log("Succes!");
            }
        });
    }



    /*execute() {
        for (i in l)
        {
            var where = this.where + i;
            var contents = fs.readFileSync(where);
            for (j in )
        }
    }*/

    rate(where) {

    }
}

module.exports = LeagueInfo;