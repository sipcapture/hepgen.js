// HEP Packet Generator for Devs

var HEPjs = require('hep-js');
var dgram = require('dgram');

var version = 'v0.1.4';
var debug = false;
var stats = {rcvd: 0, parsed: 0, hepsent: 0, err: 0, heperr: 0 }; 

if(process.argv.indexOf("-d") != -1){
    debug = true; 
}

var _config_ = require("./config/default");
if(process.argv.indexOf("-c") != -1){
    _config_ = require(process.argv[process.argv.indexOf("-c") + 1]); 
}
var messages = _config_.MESSAGES;

if(process.argv.indexOf("-s") != -1){
    _config_.HEP_SERVER = process.argv[process.argv.indexOf("-s") + 1]; 
}
if(process.argv.indexOf("-p") != -1){
    _config_.HEP_PORT = process.argv[process.argv.indexOf("-p") + 1]; 
}


/* UDP Socket Handler */

var getSocket = function (type) {
    if (undefined === socket) {
        socket = dgram.createSocket(type);
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
    }
    return socket;
}

var socket = dgram.createSocket("udp4");
    socket = getSocket('udp4'); 

var sendHEP3 = function(msg,rcinfo){
	if (rcinfo) {
		try {
			if (debug) console.log('Sending HEP3 Packet to '+_config_.HEP_SERVER+':'+_config_.HEP_PORT+'...');
			var hep_message = HEPjs.encapsulate(msg,rcinfo);
			stats.parsed++;
			if (hep_message) {
				socket.send(hep_message, 0, hep_message.length, _config_.HEP_PORT, _config_.HEP_SERVER, function(err) {
					stats.hepsent++;
					count--;
					if (count == 0) {
				  	   socket.close();
				  	   console.log(stats);
				  	   console.log('Done! Exiting...');
					     process.exit(0);
					}
				});
			} else { console.log('HEP Parsing error!'); stats.heperr++; }
		} 
		catch (e) {
			console.log('HEP3 Error sending!');
			console.log(e);
			stats.heperr++;
		}
	}
}


var count = messages.length;
var pause = 0;

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

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
	rcinfo.time_usec = datenow - (rcinfo.time_sec*1000);

	if (debug) console.log(rcinfo);

	if (message.pause && message.pause > 0) {
		pause += message.pause;
		setTimeout(function() {
		    // delayed ts
	            var datenow = new Date().getTime();
		    rcinfo.time_sec = Math.floor( datenow / 1000);
		    rcinfo.time_usec = datenow - (rcinfo.time_sec*1000);
		    sendHEP3(msg,rcinfo);
		    process.stdout.write("rcvd: "+stats.rcvd+", parsed: "+stats.parsed+", hepsent: "+stats.hepsent+", err: "+stats.err+", heperr: "+stats.heperr+"\r");
		}, pause);
	} else {
		sendHEP3(msg,rcinfo);
		process.stdout.write("rcvd: "+stats.rcvd+", parsed: "+stats.parsed+", hepsent: "+stats.hepsent+", err: "+stats.err+", heperr: "+stats.heperr+"\r");
	}

});

