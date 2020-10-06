// HEPGEN-JS SETTINGS for the IPv6 scenario
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@1:1:2:2:3';

var config = {
    NAME: 'SIP Session + All Reports',
    HEP_SERVER: '127.0.0.1',
    HEP_PORT: 9060,
    HEP_ID: '2001',
    HEP_AUTH: 'myHep',
    // the Messages to send
    MESSAGES: [
        {
            // SIP INVITE
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '2a01:4f8:160:7394::2',
    			dstIp: 'fe80::ca60:ff:fee9:47f0',
    			srcPort: 5060,
    	  		dstPort: 5070
    		},
    		pause: 0,
	        payload:
	        'INVITE sip:hepgen@lge.qxip.ipcx.nl;user=phone SIP/2.0\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394:0:0:0:2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
                'Max-Forwards: 70\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>\n'+
                'Call-ID: '+call_id+'\n'+
                'CSeq: 1 INVITE\n'+
                'Contact: <sip:+31602146974@[602d:44c6:f220:8e40::1234]>\n'+
                'Supported: timer, path, replaces\n'+
                'Session-Expires: 1800;refresher=uac\n'+
                'Min-SE: 1200\n'+
                'Privacy: none\n'+
                'User-Agent: HEPGEN-UAC\n'+
                'Content-Type: application/sdp\n'+
                'Content-Disposition: session\n'+
                'Content-Length: 284\n\n'+
                'v=0\n'+
                'o=FreeSWITCH 1586327319 1586327320 IN IP6 2a01:4f8:160:7394::2\n'+
                's=FreeSWITCH\n'+
                'c=IN IP6 2a01:4f8:160:7394::5555\n'+
                't=0 0\n'+
                'm=audio 44555 RTP/AVP 8 0 101\n'+
                'a=rtpmap:8 PCMA/8000\n'+
                'a=rtpmap:0 PCMU/8000\n'+
                'a=rtpmap:101 telephone-event/8000\n'+
                'a=fmtp:101 0-16\n'+
                'a=sendrecv\n'+
                'a=rtcp:20811\n'+
                'a=ptime:20\n'+
                '\r\n\r\n'
        },
        {
            // SIP Response 100 Trying
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: 'fe80::ca60:ff:fee9:47f0',
			    dstIp: '2a01:4f8:160:7394::2',
    			srcPort: 5070,
    	  		dstPort: 5060
    		},
    		pause: 200,
	        payload:
	        'SIP/2.0 100 Trying\n'+
                'Call-ID: '+call_id+'\n'+
                'CSeq: 1 INVITE\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394:0:0:0:2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
                'Content-Length: 0\n'+
                'Contact: <sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp>\n'+
                'Server: Bluebol 5060 MGC-8 1.2.0.4.SP2.1\n'+
                '\r\n\r\n'
        },
        {
            // SIP 180 Ringing
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: 'fe80::ca60:ff:fee9:47f0',
                dstIp: '2a01:4f8:160:7394::2',
    			srcPort: 5070,
    	  		dstPort: 5060
    		},
    		pause: 1000,
	        payload:
	        'SIP/2.0 180 Ringing\n'+
                'Call-ID: '+call_id+'\n'+
                'CSeq: 1 INVITE\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394:0:0:0:2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
                'Content-Length: 285\n'+
                'Contact: <sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp>;oai=yyyyBv6Taw8yS_bWr+owxY+5x_8sYTXY>\n'+
                'Content-Type: application/sdp\n'+
                'Server: Bluebol 5060 MGC-8 1.2.0.4.SP2.1\n'+
                'Allow: INVITE,BYE,ACK,OPTIONS,CANCEL,PRACK,UPDATE\n'+
                'P-Early-Media: sendrecv\n\n'+
                'v=0\n'+
                'o=- 3795340956 3795340956 IN IP6 oit.k1r0l.qxiphepgenipv6.ipcx.nl\n'+
                's=-\n'+
                'c=IN IP6 fe80::ca60:ff:fee9:47f0:7777\n'+
                't=0 0\n'+
                'm=audio 33000 RTP/AVP 8 101\n'+
                'a=sendrecv\n'+
                'a=ptime:20\n'+
                'a=maxptime:30\r\n'+
                'a=rtpmap:8 PCMA/8000\n'+
                'a=rtpmap:101 telephone-event/8000\n'+
                'a=fmtp:101 0-15\n'+
                'a=silenceSupp:off - - - -\n'+
                '\r\n\r\n'
        },
        {
            // SIP Response 200 OK
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: 'fe80::ca60:ff:fee9:47f0',
                dstIp: '2a01:4f8:160:7394::2',
    			srcPort: 5070,
    	  		dstPort: 5060
    		},
    		pause: 1200,
	        payload:
	        'SIP/2.0 200 OK\n'+
                'From: "+31602146974" <sip:+31602146974@[21a0:m4m4:qx1p:s1p4::1234]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394:0:0:0:2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
	            'Call-ID: '+call_id+'\n'+
	            'CSeq: 1 INVITE\n'+
	            'User-Agent: HEPGEN-UAS\n'+
	            'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	            'Supported: replaces path, 100rel, timer\n'+
                'Contact: <sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp>;oai=yyyyBv6Taw8yS_bWr+owxY+5x_8sYTXY>\n'+
                'Require: timer\n'+
                'Server: Bluebol 5060 MGC-8 1.2.0.4.SP2.1\n'+
	            'Content-Type: application/sdp\n'+
	            'Content-Length: 285\n'+
                'Privacy: none\n\n'+
	            'v=0\n'+
                'o=- 3795340956 3795340956 IN IP6 oit.k1r0l.qxiphepgenipv6.ipcx.nl\n'+
                's=-\n'+
                'c=IN IP6 fe80::ca60:ff:fee9:7777\n'+
                't=0 0ì\n'+
                'm=audio 33000 RTP/AVP 8 101\n'+
                'a=sendrecv\n'+
                'a=ptime:20\n'+
                'a=maxptime:30\n'+
                'a=rtpmap:8 PCMA/8000\n'+
                'a=rtpmap:101 telephone-event/8000\n'+
                'a=fmtp:101 0-15\n'+
                'a=silenceSupp:off - - - -\n'+
	            '\r\n\r\n'
        },
        {
            // SIP ACK
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: '2a01:4f8:160:7394::2',
                dstIp: 'fe80::ca60:ff:fee9:47f0',
    			srcPort: 5060,
    	  		dstPort: 5070
    		},
    		pause: 1400,
	        payload:
	        'ACK sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp;oai=yyyyBv6Taw8yS_bWr+owxY+5x_8sYTXY SIP/2.0\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394::2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
                'Max-Forwards: 70\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Call-ID: '+call_id+'\n'+
                'CSeq: 1 ACK\n'+
                'Contact: <sip:mod_sofia@[2a01:4f8:160:7394::2]:5060>\n'+
                'Content-Length: 0\n'+
                'Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, PRACK\n'+
                '\r\n\r\n'
        },
        {
            // SIP BYE
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: '2a01:4f8:160:7394::2',
                dstIp: 'fe80::ca60:ff:fee9:47f0',
    			srcPort: 5060,
    	  		dstPort: 5070
    		},
    		pause: 1600,
	        payload:
	        'BYE sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp;oai=yyyyBv6Taw8yS_bWr+owxY+5x_8sYTXY SIP/2.0\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394::2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
                'Max-Forwards: 70\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Call-ID: '+call_id+'\n'+
                'CSeq: 1 BYE\n'+
                'Supported: timer, path, replaces\n'+
                'Reason: Q.850;cause=16;text="NORMAL_CLEARING"\n'+
                'Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, PRACK\n'+
                'Content-Length: 0\n'+
                'User-Agent: HEPGEN-UAS\n'+
                '\r\n\r\n'
        },
        {
            // SIP Response 200 OK (final)
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			proto_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 10,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
			    srcIp: 'fe80::ca60:ff:fee9:47f0',
                dstIp: '2a01:4f8:160:7394::2',
    			srcPort: 5070,
    	  		dstPort: 5060
    		},
    		pause: 1800,
	        payload:
	        'SIP/2.0 200 OK\n'+
                'Call-ID: '+call_id+'\n'+
	            'CSeq: 1 BYE\n'+
                'From: "+31602146974" <sip:+31602146974@[2a01:4f8:160:7394::2]>;tag=g4t6aU1XaFr5S\n'+
                'To: <sip:+31612366699@lge.qxip.ipcx.nl;user=phone>;tag=127.0.0.1alUtKGp-01039+1+e15c0013+8c18051\n'+
                'Via: SIP/2.0/UDP [2a01:4f8:160:7394::2];branch=z9hG4bK934d.2b60491d4b2268c90e588d8a91e4bba9.0\n'+
	            'User-Agent: HEPGEN-UAS\n'+
	            'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
                'Contact: <sip:Fr4nkV1ncentZ4ppa@[fe80::ca60:ff:fee9:47f0];transport=udp>;oai=yyyyBv6Taw8yS_bWr+owxY+5x_8sYTXY>\n'+
                'Require: timer\n'+
                'Server: Bluebol 5060 MGC-8 1.2.0.4.SP2.1\n'+
	            'Content-Length: 0\n'+
                'Supported: replaces, path, 100rel, timer\n'+
	            '\r\n\r\n'
        },
    ]
};

// ------------------------------------------------------

module.exports = config;
