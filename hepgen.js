#!/usr/bin/env node

// HEP Packet Generator for Devs
var HEPjs = require('hep-js');
var dgram = require('dgram');
const net = require('net')
const tls = require('node:tls')
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;

var version = 'v1.0.9';
var debug = false;
var stats = {rcvd: 0, parsed: 0, hepsent: 0, err: 0, heperr: 0 };
var socketUsers = 0;


/* UDP Socket Handler */

var getSocket = function (type) {
    if(debug)console.log('Socket Type =', type);
    if (undefined === socket && type === 'udp4') {
        socket = dgram.createSocket(type);
    } else if (type === 'tcp') {
      socket = net.connect(_config_.HEP_PORT, _config_.HEP_SERVER)
    } else if (type === 'tls') {
	  socket = tls.connect(_config_.HEP_PORT, _config_.HEP_SERVER)
	  console.log('TLS Socket', socket)
	}

    var socketErrorHandler = (err)=>{
      console.log(err);
      throw(err);
    }

    socket.on('error', socketErrorHandler);
    /**
     * Handles socket's 'close' event,
     * recover socket in case of unplanned closing.
     */
    var socketCloseHandler = function () {
        if (socketUsers > 0) {
            socket = undefined;
            --socketUsers;
            getSocket(type);
        }
    };

    socket.on('close', socketCloseHandler);


    return socket;
}


var countDown = function(){
	count--;
	if (count == 0) {
		if(socket && socket.hasOwnProperty('close')) socket.close();
		console.log(stats);
		console.log('Done! Exiting...');
		process.exit(0);
	}
}

var sendHEP3 = function(msg,rcinfo){
	if (rcinfo) {
		try {
			if (debug) console.log('Sending HEP3 Packet to '+_config_.HEP_SERVER+':'+_config_.HEP_PORT+'...');
			var hep_message = HEPjs.encapsulate(msg,rcinfo);
			stats.parsed++;
			if (hep_message) {
        if(_config_.SOCKET_TYPE == 'udp4'){
          socket.send(hep_message, 0, hep_message.length, _config_.HEP_PORT, _config_.HEP_SERVER, function(err) {
  					stats.hepsent++;
  					countDown();
  				});
        } else {
          socket.write(hep_message, function(err) {
            if(!err){
              stats.hepsent++;
    					countDown();
            } else {
              if(debug)console.log('tcp socket err: ', err);
              stats.err++;
              countDown();
            }
  				});
        }
			} else { console.log('HEP Parsing error!'); stats.heperr++; }
		}
		catch (e) {
			console.log('HEP3 Error sending!');
			console.log(e);
			stats.err++;
      countDown();
		}
	}
}

var sendAPI = function(msg,rcinfo){
	/* 	PUSH non-HEP data to API using methods in rcinfo for Query parameters.
		For an example API message format, see config/log.js
	*/
	if (debug) console.log('API DEBUG',_config_,rcinfo,msg);
	const http = require('http')
	const options = {
	  hostname: rcinfo.hostname || _config_.API_SERVER || '127.0.0.1',
	  port: rcinfo.port || _config_.API_PORT || 3100,
	  path: rcinfo.path,
	  method: rcinfo.method,
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': JSON.stringify(msg).length
	  }
	}

	const req = http.request(options, (res) => {
	  console.log(`API statusCode: ${res.statusCode}`)
	  stats.hepsent++;
	  countDown();
	  res.on('data', (d) => {
	    process.stdout.write(d)
	  })
	})

	req.on('error', (error) => {
	  console.error(error)
	  stats.heperr++;
	})
	req.write(JSON.stringify(msg));
	req.end();

}

var routeOUT = function(msg,rcinfo){
  console.log('ROUTING',msg,rcinfo);
	if (rcinfo.type === "HEP"){
		sendHEP3(msg,rcinfo);
	} else if(rcinfo.type === "API") {
		sendAPI(msg,rcinfo);
	} else {
		console.error('Unsupported Type!',rcinfo);
	}
};

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

var count = 0;
var pause = 0;

const execHEP = function(messages) {
  count = messages.length;
  messages.forEach(function preHep(message) {

	var rcinfo = message.rcinfo;
	var msg = message.payload;
	if (debug) console.log(msg);
	stats.rcvd++;

	if (message.sleep) {
		console.log('sleeping '+message.sleep+' ms...');
		sleep( message.sleep );
	}

	var hrTime = process.hrtime();
	var datenow = new Date().getTime();
	rcinfo.time_sec = Math.floor( datenow / 1000);
	rcinfo.time_usec = (datenow - (rcinfo.time_sec*1000))*1000;

	if (debug) console.log(rcinfo);
	if (message.pause && (message.pause > 10000 || message.pause < 0 )) message.pause = 100;
	if (message.pause && message.pause > 0) {
		pause += message.pause;
		setTimeout(function() {
		    // delayed ts
	            var datenow = new Date().getTime();
		    rcinfo.time_sec = Math.floor( datenow / 1000);
		    rcinfo.time_usec = (datenow - (rcinfo.time_sec*1000))*1000;
		    routeOUT(msg,rcinfo);
		    process.stdout.write("rcvd: "+stats.rcvd+", parsed: "+stats.parsed+", hepsent: "+stats.hepsent+", err: "+stats.err+", heperr: "+stats.heperr+"\r");
		}, pause);
	} else {
		routeOUT(msg,rcinfo);
		process.stdout.write("rcvd: "+stats.rcvd+", parsed: "+stats.parsed+", hepsent: "+stats.hepsent+", err: "+stats.err+", heperr: "+stats.heperr+"\r");
	}
  });
}


/* Beginning of execution */

if(process.argv.indexOf("-d") != -1){
    debug = true;
}

var _config_ = require("./config/default");

if(process.argv.indexOf("-c") != -1){
    _config_ = require(process.argv[process.argv.indexOf("-c") + 1]);
	if(process.argv.indexOf("-d") != -1){
		debug = true;
	}
	if(process.argv.indexOf("-s") != -1){
	    _config_.HEP_SERVER = process.argv[process.argv.indexOf("-s") + 1];
	}
	if(process.argv.indexOf("-p") != -1){
	    _config_.HEP_PORT = process.argv[process.argv.indexOf("-p") + 1];
	}
	if(process.argv.indexOf("-a") != -1){
	    _config_.API_SERVER = process.argv[process.argv.indexOf("-a") + 1];
	}
  // socket type flag
  if(process.argv.indexOf("-t") != -1) {
    _config_.SOCKET_TYPE = process.argv[process.argv.indexOf("-t") + 1];
  } else {
    _config_.SOCKET_TYPE = 'udp4';
  }

	if (debug) console.log(_config_);
        execHEP(_config_.MESSAGES);
}

var socket = getSocket(_config_.SOCKET_TYPE);

if(process.argv.indexOf("-P") != -1){


	const { spawn } = require('child_process');
	const top = spawn('nodejs', ['tools/convert.js', process.argv[process.argv.indexOf("-P") + 1]] );
	var message = '';

	top.stdout.on('data', (data) => {
	  message += data;
	});

	top.stderr.on('data', (data) => {
	  console.log('Error parsing input!');
	});

	top.on('close', (code) => {
	  _config_ = JSON.parse(message);
	  if(process.argv.indexOf("-s") != -1){
	    _config_.HEP_SERVER = process.argv[process.argv.indexOf("-s") + 1];
  	  }
	  if(process.argv.indexOf("-p") != -1){
	    _config_.HEP_PORT = process.argv[process.argv.indexOf("-p") + 1];
	  }
	  execHEP(_config_.MESSAGES);
	});

}
