// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

var config = {
        NAME: 'SIP OPTIONS Ping',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [
        {
                // SIP OPTIONS Request
    		  rcinfo: {
    			  type: 'HEP',
    			  version: 3,
    			  payload_type: 1,
    			  captureId: '2001',
    			  capturePass: 'myHep',
    			  ip_family: 2,
    			  protocol: 17,
    			  proto_type: 1,
    			  srcIp: '192.168.1.1',
    			  dstIp: '192.168.1.2',
    			  srcPort: 5060,
    	  		dstPort: 5060
    		    },
    		    pause: 0,
            	    payload: 'OPTIONS sip:127.0.0.1 SIP/2.0\nCall-ID: '+call_id+'\nCSeq: 9999 OPTIONS\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>\nVia: SIP/2.0/UDP 127.0.0.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332\nMax-Forwards: 70\nUser-Agent: HEPGEN-UAC\nContent-Length: 0\r\n\r\n'
          },
          {
                // SIP Response
    		  rcinfo: {
    			  type: 'HEP',
    			  version: 3,
    			  payload_type: 1,
    			  captureId: '2001',
    			  capturePass: 'myHep',
    			  ip_family: 2,
    			  protocol: 17,
    			  proto_type: 1,
    			  srcIp: '192.168.1.2',
    			  dstIp: '192.168.1.1',
    			  srcPort: 5060,
    	  		  dstPort: 5060
    		    },
    		    pause: 1000,
            	    payload: 'SIP/2.0 200 Alive\nRecord-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=2628881569;socket=udp:127.0.0.1:5060>\nCall-ID: '+call_id+'\nCSeq: 9999 OPTIONS\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.369f\nVia: SIP/2.0/UDP 192.168.1.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332;rport=48495\nUser-Agent: HEPGEN-UAS\nContent-Length: 0\r\n\r\n' 
    	  }

      ]
};

// ------------------------------------------------------

module.exports = config;
