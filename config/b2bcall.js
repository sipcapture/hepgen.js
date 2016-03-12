// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var rand = function(maximum,minimum){
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';
var caller = 'hepgenjs';
var caller_e164 = '+1234567'+rand(100,999);
var callee = rand(101,199);
var domain = 'sipcapture.org';
var priv_ip = '192.168.10.'+rand(10,200);
var priv_nat ='10.20.30.40';
var pub_ip= '20.30.40.50';
var peer_ip='55.66.77.'+rand(80,88);
var localhost = '127.0.0.1';

var useragent = 'HEPGEN.JS@sipcapture.org';

// tag

var config = {
        NAME: 'SIP Session + All Reports',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [


{    
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
    		srcIp: priv_nat,
    		dstIp: pub_ip,
    		srcPort: 5064,
    	  	dstPort: 5060
    	},
        pause: 250,
    	payload:
	'INVITE sip:'+callee+'@'+domain+';user=phone SIP/2.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK923381359;rport\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 INVITE\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\n'+
	'Max-Forwards: 70\n'+
	'User-Agent: '+useragent+'\n'+
	'Privacy: none\n'+
	'P-Preferred-Identity: <sip:'+caller+'@'+domain+';user=phone>\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Type: application/sdp\n'+
	'Accept: application/sdp, application/dtmf-relay\n'+
	'Content-Length:   313\n'+
	'\n'+
	'v=0\n'+
	'o='+caller+' 8000 8000 IN IP4 '+priv_ip+'\n'+
	's=SIP Call\n'+
	'c=IN IP4 '+priv_ip+'\n'+
	't=0 0\n'+
	'm=audio 5004 RTP/AVP 0 8 9 18 101\n'+
	'a=sendrecv\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=ptime:20\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:9 G722/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-15\n'+
	'\r\n\r\n'


}, {    

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
    		srcIp: localhost,
    		dstIp: localhost,
    		srcPort: 5062,
    	  	dstPort: 5060
    	},
        pause: 250,
    	payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 INVITE\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'P-Auth-IP: '+priv_nat+'\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'SIP',
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 100,
                          srcIp: localhost,
                          dstIp: localhost,
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
                  pause: 100,
                  payload: 'INFO: <script>: NATed request detected - R=sip:'+callee+'@'+domain+';user=phone ID='+call_id


}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 INVITE\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 407 Proxy Authentication Required\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 INVITE\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'P-Auth-IP: '+priv_nat+'\n'+
	'P-Auth-UA: '+useragent+'\n'+
	'Proxy-Authenticate: Digest realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z"\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'

}, {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'SIP',
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 100,
                          srcIp: localhost,
                          dstIp: localhost,
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
                  pause: 100,
                  payload: 'INFO: <script>: Reply from Inbound - S=407 - Proxy Authentication Required M=INVITE IP=udp:127.0.0.1:5062 ID='+call_id


}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 407 Proxy Authentication Required\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 INVITE\n'+
	'Proxy-Authenticate: Digest realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z"\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: priv_nat,
                dstIp: pub_ip,
                srcPort: 5064,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'ACK sip:'+callee+'@'+domain+';user=phone SIP/2.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK923381359;rport\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 ACK\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: priv_nat,
                dstIp: pub_ip,
                srcPort: 5064,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'INVITE sip:'+callee+'@'+domain+';user=phone SIP/2.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK104237110;rport\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\n'+
	'Proxy-Authorization: Digest username="'+caller+'", realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z", uri="sip:'+callee+'@'+domain+';user=phone", response="a83968423badaffff81955d3d1ba944d", algorithm=MD5\n'+
	'Max-Forwards: 70\n'+
	'User-Agent: '+useragent+'\n'+
	'Privacy: none\n'+
	'P-Preferred-Identity: <sip:'+caller+'@'+domain+';user=phone>\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Type: application/sdp\n'+
	'Accept: application/sdp, application/dtmf-relay\n'+
	'Content-Length:   313\n'+
	'\n'+
	'v=0\n'+
	'o='+caller+' 8000 8000 IN IP4 '+priv_ip+'\n'+
	's=SIP Call\n'+
	'c=IN IP4 '+priv_ip+'\n'+
	't=0 0\n'+
	'm=audio 5004 RTP/AVP 0 8 9 18 101\n'+
	'a=sendrecv\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=ptime:20\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:9 G722/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-15\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5062
        },
        pause: 250,
        payload:
	'ACK sip:'+callee+'@'+domain+';user=phone SIP/2.0\n'+
	'Max-Forwards: 10\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 440 ACK\n'+
	'Content-Length: 0\n'+
	'P-Src-Ip: '+priv_nat+'\n'+
	'P-Src-Port: 5064\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'P-Sock-Info: udp:'+pub_ip+':5060\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'P-Auth-IP: '+priv_nat+'\n'+
	'P-Auth-UA: '+useragent+'\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n' 


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 101 Connecting\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'P-Auth-IP: '+priv_nat+'\n'+
	'P-Auth-UA: '+useragent+'\n'+
	'P-Authorization: '+caller+'\n'+
	'P-Authorized: 1\n'+
	'P-Caller-UUID: 8f38d8a9-2152-408d-ab05-c587a52bb89a\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5080,
                dstPort: 5062
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Connecting\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bK108.7a23429f0ff569e334535fa224937400.0;received=127.0.0.1\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'Server: Application Server\n'+
	'Contact: <sip:'+callee+'@127.0.0.1:5080>\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5080,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'INVITE sip:'+callee+'@'+peer_ip+':5060;transport=udp SIP/2.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\n'+
	'CSeq: 10 INVITE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'Contact: <sip:127.0.0.1:5080>\n'+
	'Route: <sip:127.0.0.1:5060;received=\'sip:'+peer_ip+':5060;transport=udp\';lr>\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Accept: application/sdp, application/dtmf-relay\n'+
	'P-Asserted-Identity: <sip:'+caller_e164+'@'+domain+'>\n'+
	'P-D-Uri: sip:127.0.0.1:5060;received=\'sip:'+peer_ip+':5060;transport=udp\'\n'+
	'Content-Type: application/sdp\n'+
	'Content-Length: 377\n'+
	'\n'+
	'v=0\n'+
	'o='+caller+' 8000 8000 IN IP4 '+pub_ip+'\n'+
	's=SIP Call\n'+
	'c=IN IP4 '+pub_ip+'\n'+
	't=0 0\n'+
	'm=audio 31954 RTP/AVP 0 8 9 18 101\n'+
	'a=sendrecv\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=ptime:20\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:9 G722/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-15\n'+
	'a=direction:active\n'+
	'a=oldmediaip:'+priv_ip+'\n'+
	'a=rtcp:31955\n'+
	'\r\n\r\n'

}, {    

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
                srcIp: peer_ip,
                dstIp: pub_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\n'+
	'CSeq: 10 INVITE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'User-Agent: INUM\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\n'+
	'CSeq: 10 INVITE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'User-Agent: INUM\n'+
	'Content-Length: 0\n'+
	'P-Src-Ip: '+peer_ip+'\n'+
	'P-Src-Port: 5060\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: peer_ip,
                dstIp: pub_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 100 trying -- your call is important to us\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\n'+
	'CSeq: 10 INVITE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'User-Agent: INUM\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'

}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'SIP/2.0 100 trying -- your call is important to us\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\n'+
	'CSeq: 10 INVITE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'User-Agent: INUM\n'+
	'Content-Length: 0\n'+
	'P-Src-Ip: '+peer_ip+'\n'+
	'P-Src-Port: 5060\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: peer_ip,
                dstIp: pub_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'CSeq: 10 INVITE\n'+
	'User-Agent: iNum\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	'Supported: replaces\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\n'+
	'Content-Type: application/sdp\n'+
	'Content-Length: 311\n'+
	'\n'+
	'v=0\n'+
	'o=root 11882 11882 IN IP4 '+peer_ip+'\n'+
	's=session\n'+
	'c=IN IP4 '+peer_ip+'\n'+
	't=0 0\n'+
	'm=audio 12366 RTP/AVP 8 0 18 101\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-16\n'+
	'a=silenceSupp:off - - - -\n'+
	'a=ptime:20\n'+
	'a=sendrecv\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'CSeq: 10 INVITE\n'+
	'User-Agent: iNum\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	'Supported: replaces\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\n'+
	'Content-Type: application/sdp\n'+
	'Content-Length: 311\n'+
	'P-Src-Ip: '+peer_ip+'\n'+
	'P-Src-Port: 5060\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'\n'+
	'v=0\n'+
	'o=root 11882 11882 IN IP4 '+peer_ip+'\n'+
	's=session\n'+
	'c=IN IP4 '+peer_ip+'\n'+
	't=0 0\n'+
	'm=audio 12366 RTP/AVP 8 0 18 101\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-16\n'+
	'a=silenceSupp:off - - - -\n'+
	'a=ptime:20\n'+
	'a=sendrecv\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 INVITE\n'+
	'User-Agent: iNum\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	'Supported: replaces\n'+
	'Content-Type: application/sdp\n'+
	'Content-Length: 329\n'+
	'Contact: <sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw>\n'+
	'\n'+
	'v=0\n'+
	'o=root 11882 11882 IN IP4 '+pub_ip+'\n'+
	's=session\n'+
	'c=IN IP4 '+pub_ip+'\n'+
	't=0 0\n'+
	'm=audio 31956 RTP/AVP 8 0 18 101\n'+
	'a=rtpmap:8 PCMA/8000\n'+
	'a=rtpmap:0 PCMU/8000\n'+
	'a=rtpmap:18 G729/8000\n'+
	'a=fmtp:18 annexb=no\n'+
	'a=rtpmap:101 telephone-event/8000\n'+
	'a=fmtp:101 0-16\n'+
	'a=silenceSupp:off - - - -\n'+
	'a=ptime:20\n'+
	'a=sendrecv\n'+
	'a=rtcp:31957\n'+
	'\r\n\r\n'

}, {    

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
                srcIp: priv_nat,
                dstIp: pub_ip,
                srcPort: 5064,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'ACK sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw SIP/2.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK1536455165;rport\n'+
	'Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 ACK\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\n'+
	'Proxy-Authorization: Digest username="'+caller+'", realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z", uri="sip:'+callee+'@'+domain+';user=phone", response="a83968423badaffff81955d3d1ba944d", algorithm=MD5\n'+
	'Max-Forwards: 70\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'ACK sip:127.0.0.1:5080 SIP/2.0\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bK108.0fd09acb0f53e63bd1f6a6e0953c2f1d.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.5ae58236d6ead15f6ae2d0eaa55bcccd.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK1536455165;rport=5064\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 441 ACK\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\n'+
	'Max-Forwards: 68\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'

}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5080,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'ACK sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKarC4XaNK;rport\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'CSeq: 10 ACK\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'Contact: <sip:127.0.0.1:5080>\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: pub_ip,
                dstIp: peer_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'ACK sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\n'+
	'Max-Forwards: 10\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.4e589db6a3d69d4d4ee211444d6d8d29.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKarC4XaNK;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'CSeq: 10 ACK\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'Contact: <sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw>\n'+
	'\r\n\r\n'

}, {    

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
                srcIp: priv_nat,
                dstIp: pub_ip,
                srcPort: 5064,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'BYE sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw SIP/2.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK829262785;rport\n'+
	'Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\n'+
	'Max-Forwards: 70\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5062
        },
        pause: 250,
        payload:
	'BYE sip:127.0.0.1:5080 SIP/2.0\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\n'+
	'Max-Forwards: 69\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'P-Src-Ip: '+priv_nat+'\n'+
	'P-Src-Port: 5064\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'P-Sock-Info: udp:'+pub_ip+':5060\n'+
	'P-Src-Nat: 1\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'P-Auth-IP: '+priv_nat+'\n'+
	'P-Auth-UA: '+useragent+'\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 100 Trying\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Server: SIP Proxy\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'BYE sip:127.0.0.1:5080 SIP/2.0\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bKef7.c1f3367df5cff89f98058ed5508fce22.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\n'+
	'Max-Forwards: 68\n'+
	'Supported: replaces, path, timer, eventlist\n'+
	'User-Agent: '+useragent+'\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5080,
                dstPort: 5062
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bKef7.c1f3367df5cff89f98058ed5508fce22.0;received=127.0.0.1\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Server: Application Server\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5062,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Server: Application Server\n'+
	'Content-Length: 0\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: pub_ip,
                dstIp: priv_nat,
                srcPort: 5060,
                dstPort: 5064
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\n'+
	'Call-ID: '+call_id+'\n'+
	'CSeq: 442 BYE\n'+
	'Server: Application Server\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5080,
                dstPort: 5060
        },
        pause: 5000,
        payload:
	'BYE sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'CSeq: 11 BYE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: pub_ip,
                dstIp: peer_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'BYE sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\n'+
	'Max-Forwards: 10\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'CSeq: 11 BYE\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'


}, {    

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
                srcIp: peer_ip,
                dstIp: pub_ip,
                srcPort: 5060,
                dstPort: 5060
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'CSeq: 11 BYE\n'+
	'User-Agent: iNum\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	'Supported: replaces\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\n'+
	'Content-Length: 0\n'+
	'\r\n\r\n'



}, {    

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
                srcIp: localhost,
                dstIp: localhost,
                srcPort: 5060,
                dstPort: 5080
        },
        pause: 250,
        payload:
	'SIP/2.0 200 OK\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\n'+
	'Call-ID: '+call_id+'_b2b-1\n'+
	'CSeq: 11 BYE\n'+
	'User-Agent: iNum\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\n'+
	'Supported: replaces\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\n'+
	'Content-Length: 0\n'+
	'P-Src-Ip: '+peer_ip+'\n'+
	'P-Src-Port: 5060\n'+
	'P-Src-Proto: udp\n'+
	'P-Src-Af: 4\n'+
	'\r\n\r\n'

}, {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'SIP',
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 100,
                          srcIp: localhost,
                          dstIp: localhost,
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
                  pause: 100,
                  payload: 'CDR: TS='+new Date().toISOString()+' FROM='+caller_e164+' TO='+callee+' COST= 0.00'+rand(21,55)+' ID='+call_id

 }

]

};

// ------------------------------------------------------

module.exports = config;
