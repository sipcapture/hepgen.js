// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

var config = {
        NAME: 'SIP Scanner Alarm',
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
    			  correlation_id: call_id,
    			  srcIp: '192.168.1.1',
    			  dstIp: '192.168.1.2',
    			  srcPort: 5060,
    	  		dstPort: 5060
    		    },
    		    pause: 0,
            	    payload: 
		'INVITE sip:900442037690000@someprovider.com SIP/2.0\n'+
		'To: 900442037690000<sip:900442037690000@someprovider.com>\n'+
		'From: 1<sip:1@192.168.99.99>;tag=2fd7b751\n'+
		'Via: SIP/2.0/UDP 192.168.99.99:5071;branch=z9hG4bK-897b2a55c16140a97dab4273ac879fb0;rport\n'+
		'Call-ID: '+call_id+'\n'+
		'CSeq: 1 INVITE\n'+
		'Contact: <sip:1@10.0.10.1:5071>\n'+
		'Max-Forwards: 70\n'+
		'Allow: INVITE, ACK, CANCEL, BYE\n'+
		'User-Agent: sipcli/v1.8\n'+
		'Content-Type: application/sdp\n'+
		'Content-Length: 283\n'+
		'\n'+
		'v=0\n'+
		'o=sipcli-Session 1189727098 1654538214 IN IP4 192.168.99.99\n'+
		's=sipcli\n'+
		'c=IN IP4 192.168.99.99\m'+
		't=0 0\n'+
		'm=audio 5073 RTP/AVP 18 0 8 101\n'+
		'a=fmtp:101 0-15\n'+
		'a=rtpmap:18 G729/8000\n'+
		'a=rtpmap:0 PCMU/8000\n'+
		'a=rtpmap:8 PCMA/8000\n'+
		'a=rtpmap:101 telephone-event/8000\n'+
		'a=ptime:20\n'+
		'a=sendrecv\n'+
		'\r\n\r\n'

    	  }

      ]
};

// ------------------------------------------------------

module.exports = config;
