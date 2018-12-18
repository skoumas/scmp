'use strict';
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');
const mysql = require('mysql');
const PORT = 8080;
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var colors= ['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F',
	'#B276B2', '#DECF3F', '#F15854'];

// Get Poll
app.get('/polls', (req, res) => {

	var connection = mysql.createConnection({
		host     : 'db',
		user     : 'scmp',
		password : 'CABinNYQRwu8XqcRqxdxQEAG',
		database : 'scmp'
	});
	connection.connect();

    res.header ('Access-Control-Allow-Origin', '*');
	fs.readFile('/usr/src/app/src/poll.json', 'utf8', function (err, data) {
		data = JSON.parse(data);
		data.polls.forEach(function(element) {
			let options;
			var poll = data.polls.find(data => data.id === element.id);
			options = poll.answer.options;
			let total ;
			let final = [];
			connection.query("SELECT option_id, count(id) as count,(SELECT count(id) from votes where poll_id="+ element.id +") as totalCount  FROM votes where poll_id=" + element.id + " group by option_id", function (err, dbresult, fields) {
				//merge two tables
				if(typeof dbresult[0] !== 'undefined') {
					total = (dbresult[0].totalCount > 0) ? dbresult[0].totalCount: 0 ;
					for (var i = 0; i < options.length; i++ ) {
						if(typeof dbresult[i] !== 'undefined') {
					    	if (options[i].id === dbresult[i].option_id) {
					      		final.push({expanded:true, title: options[i].label + "(" + ( dbresult[i].count / total * 100)  + ")", value: ( dbresult[i].count), color: colors[i] });
					  		}
				  		} else {
							final.push({title: options[i].label, value: 0, color: colors[i]});
						}
					}

					element.results = {};
					element.results.data = final;
					element.results.total = total;
				} else {
					element.results = {};
					element.results.data = null;
					element.results.total = 0;
				}

	  		});


		});
		setTimeout(function() {
			res.json(data);
		},100);

	});
});

// Get Poll
app.post('/vote', (req, res) => {

	var connection = mysql.createConnection({
		host     : 'db',
		user     : 'scmp',
		password : 'CABinNYQRwu8XqcRqxdxQEAG',
		database : 'scmp'
	});
	connection.connect();

	var options;
    var vote  = {
		"poll_id": req.body.poll_id,
		"option_id": req.body.option_id,
		"voted_at": new Date()
	};
	fs.readFile('/usr/src/app/src/poll.json', 'utf8', function (err, data) {
		data = JSON.parse(data).polls;
		console.log(data);
		var poll = data.find(data => data.id === req.body.poll_id);
		options = poll.answer.options;
		var query = connection.query('INSERT INTO votes SET ?', vote, function(err, result) {
			connection.query("SELECT option_id, count(id) as count,(SELECT count(id) from votes where poll_id="+ req.body.poll_id +") as totalCount  FROM votes where poll_id=" + req.body.poll_id + " group by option_id", function (err, dbresult, fields) {
				//merge two tables
				let total = (dbresult[0].totalCount > 0) ? dbresult[0].totalCount: 0 ;
				let final = []
				for (var i = 0; i < options.length; i++ ) {
					if(typeof dbresult[i] !== 'undefined') {
				    	if (options[i].id === dbresult[i].option_id) {
				      		final.push({title: options[i].label + "(" +  ( dbresult[i].count / total * 100) + ")", value: ( dbresult[i].count), color: colors[i] });
				  		}
			  		} else {
						final.push({title: options[i].label, value: 0, color: colors[i]});
					}
				}
				connection.end();
				res.json({data: final, total: total});
	  		});
		});
	});
});

function getVotes(poll_id) {}
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
module.exports = app
