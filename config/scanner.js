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
		'INVITE sip:900442037690000@someprovider.com SIP/2.0\r\n'+
		'To: 900442037690000<sip:900442037690000@someprovider.com>\r\n'+
		'From: 1<sip:1@192.168.99.99>;tag=2fd7b751\r\n'+
		'Via: SIP/2.0/UDP 192.168.99.99:5071;branch=z9hG4bK-897b2a55c16140a97dab4273ac879fb0;rport\r\n'+
		'Call-ID: '+call_id+'\r\n'+
		'CSeq: 1 INVITE\r\n'+
		'Contact: <sip:1@10.0.10.1:5071>\r\n'+
		'Max-Forwards: 70\r\n'+
		'Allow: INVITE, ACK, CANCEL, BYE\r\n'+
		'User-Agent: sipcli/v1.8\r\n'+
		'Content-Type: application/sdp\r\n'+
		'Content-Length: 283\r\n'+
		'\r\n'+
		'v=0\r\n'+
		'o=sipcli-Session 1189727098 1654538214 IN IP4 192.168.99.99\r\n'+
		's=sipcli\r\n'+
		'c=IN IP4 192.168.99.99\m'+
		't=0 0\r\n'+
		'm=audio 5073 RTP/AVP 18 0 8 101\r\n'+
		'a=fmtp:101 0-15\r\n'+
		'a=rtpmap:18 G729/8000\r\n'+
		'a=rtpmap:0 PCMU/8000\r\n'+
		'a=rtpmap:8 PCMA/8000\r\n'+
		'a=rtpmap:101 telephone-event/8000\r\n'+
		'a=ptime:20\r\n'+
		'a=sendrecv\r\n'+
		'\r\r\n\r\n'

    	  }

      ]
};

// ------------------------------------------------------

module.exports = config;
