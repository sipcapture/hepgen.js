/* PCAP TEXT to HEPGEN Convertor */

var fs = require('fs');
var args = process.argv.slice(2);

if (!args || !args[0]) {
	console.log('Missing input! Exiting');
	process.exit(1);
}

var cache = { previous: { time_sec:0, time_usec:0 } };
var parsed = [];
var hepgen = [];
var net_regex = /(.*) datetime: (.*); time: (.*)\.(.*); hosts: (.*):(.*) ----> (.*):(.*) TOS/g
var callids = [];

fs.readFile(args[0], 'utf8', function(err, contents) {
    parsed = contents.split('proto: ');
    parsed.forEach(function(row){
	var tmp = row.split('VLAN:0\r\n\r\n');
	var match = [];
	tmp[0].replace(net_regex, function(full, proto, date, time, time_micro, from_ip, from_port, to_ip, to_port) {
	  time = parseInt(time); time_micro = parseInt(time_micro);
	  from_port = parseInt(from_port); to_port = parseInt(to_port);
	  var block = {
	     rcinfo:  {
    		type: 'HEP',
    		version: 3,
		//time_sec: (time),
		//time_usec: (time_micro),
    		payload_type: 1,
    		captureId: '2001',
    		capturePass: 'myHep',
    		ip_family: 2,
    		protocol: proto === 'UDP' ? 'UDP' : 'TCP',
    		proto_type: 1,
    		srcIp: from_ip,
    		dstIp: to_ip,
    		srcPort: from_port,
    	  	dstPort: to_port
	    },
	    pause: parseInt(time - cache.previous.time_sec +''+ time_micro- cache.previous.time_usec),
            payload: tmp[1]
    	  };
   	  hepgen.push(block);
	  cache.previous = { time_sec: time, time_usec: time_micro };
	});

    });

    var config = {
        NAME: 'HEPGEN '+args[0],
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: hepgen
    };

    console.log("var config = " + JSON.stringify(config, null, 2));
});


