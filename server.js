const http = require('http');
var express = require('express');
var path = require('path');
var request = require("request");
var cheerio = require('cheerio');
var fs = require("fs");
var app = express();

const Players = require('./players.js');
const LeagueInfo = require('./leagueInfo.js');

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<i>Hello World!</i>');
})



//var players = new Players();
//players.get("https://www.transfermarkt.co.uk/csm-politehnica-iasi/kader/verein/33966/saison_id/2017/plus/1", "downloads/CSM Poli Iasi.json");

//var li = new LeagueInfo("downloads/");
//li.rateAll();

server.listen(port, hostname, ()=>{
    console.log('Server started on port ' + port);
})
