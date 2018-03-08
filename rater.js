var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');

class Rater {

    constructor(where){
        this.where = where;
        var contents = fs.readFileSync(where);
        this.d = JSON.parse(contents);
    }   

    parseValue(str) {
        var value = "";
        var multiply = 1;
        for (var i=0; i<str.length; i++)
        {
            if ('0' <=str[i] && str[i]<='9' || str[i]=='.')
                value+=str[i];
            else if (str[i]=='k')
                multiply = 1000;
            else if (str[i]=='m')
                multiply = 1000000;
            else 
                continue;
        }
        value = parseFloat(value)
        value = value*multiply;
        return value;
    }

    rate(limits){
        for (var i in this.d)
        {
            var dic = this.d[i];
            var star = 0;
            while (limits[star]<dic["Value"] && star<5)
                star++;
            dic["Stars"] = star;
            this.d[i] = dic;
        }
        this.save();
    }

    getValueAverage(x){
        var ans=0, nr=0;
        for (var i in this.d)
        {
            var dic = this.d[i];
            if (dic["Value"]>=x)
            {
                ans += dic["Value"];
                nr++;
            }
        }
        if (nr==0)
            return 0;
        return ans/nr;
    }

    process() {
        for (var i in this.d)
        {
            var l = this.d[i];
            var dic = {};
            if (l.lenght<=6)
                break;
            dic["Position"] = l[0];
            dic["BirthDate"] = l[1];
            dic["Height"] = l[3];
            dic["PrefferedFoot"] = l[4];
            dic["Value"] = this.parseValue(l[8]);
            this.d[i] = dic;
        }
        this.save();
    }

    save (){
        fs.writeFile(this.where, JSON.stringify(this.d, null, 4), function(err) {
            if(err) {
                return console.log(err);
            } else {
                console.log("Succes!");
            }
        });
    }
}

module.exports = Rater;