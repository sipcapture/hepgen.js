/* PCAP TEXT to HEPGEN Convertor */

var os = require('os');
var fs = require('fs');
var args = process.argv.slice(2);
var parSIP = require('parsip');

if (!args || !args[0]) {
	console.log('{}');
	process.exit(1);
}

var cache = { previous: { time_sec:0, time_usec:0 } };
var parsed = [];
var hepgen = [];
var net_regex = /(.*) datetime: (.*); time: (.*)\.(.*); hosts: (.*):(.*) ----> (.*):(.*) TOS/g
var callids = [];

//console.log('Reading SIP from file: ',args[0] );

fs.readFile(args[0], 'utf8', function(err, contents) {

    parsed = contents.split('proto: ');
    parsed.forEach(function(row){
	var tmp = row.split(/VLAN:0\r\n\r\n|VLAN:0\n\n/);
	var match = [];
	if (!tmp[1] || !row ) { return; }
	else {
	  var rawSIP = tmp[1].split(os.EOL).join('\r\n');
  	  var mSIP = parSIP.getSIP( rawSIP );

	  // Replace Session Identifiers
	  if (mSIP) {
		if (mSIP.call_id) {
			if (!callids[mSIP.call_id]) { callids[mSIP.call_id] = Math.random().toString(36).substring(8) + mSIP.call_id }
			// console.log('replacing call_id',mSIP.call_id, callids[mSIP.call_id]);
			rawSIP = rawSIP.split(mSIP.call_id).join(callids[mSIP.call_id]);
		};
		if (mSIP.via_branch) {
			if (!callids[mSIP.via_branch]) { callids[mSIP.via_branch] = Math.random().toString(36).substring(8) + mSIP.via_branch }
			// console.log('replacing via_branch',mSIP.via_branch, callids[mSIP.via_branch]);
			rawSIP = rawSIP.split(mSIP.via_branch).join(callids[mSIP.via_branch])
		};
		if (mSIP.from_tag) {
			if (!callids[mSIP.from_tag]) { callids[mSIP.from_tag] = Math.random().toString(36).substring(8) + mSIP.from_tag }
			// console.log('replacing from_tag',mSIP.from_tag, callids[mSIP.from_tag]);
			rawSIP = rawSIP.split(mSIP.from_tag).join(callids[mSIP.from_tag])
		};
		if (mSIP.to_tag) {
			if (!callids[mSIP.to_tag]) { callids[mSIP.to_tag] = Math.random().toString(36).substring(8) + mSIP.to_tag }
			// console.log('replacing to_tag',mSIP.to_tag, callids[mSIP.to_tag]);
			rawSIP = rawSIP.split(mSIP.to_tag).join(callids[mSIP.to_tag])
		};
	  }
	}

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
	    pause: parseInt(time - cache.previous.time_sec +''+ time_micro- cache.previous.time_usec) || 0,
            payload: rawSIP || tmp[1]
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

    //console.log("var config = " + JSON.stringify(config, null, 2)+";module.exports = config;");
    console.log(JSON.stringify(config, null, 2));
});


