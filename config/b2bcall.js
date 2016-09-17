// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var rand = function(maximum,minimum){
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

var randomByte = function() {
  return Math.round(Math.random()*256);
}

var randomIp = function() {
  var ip = randomByte() +'.' +
           randomByte() +'.' +
           randomByte() +'.' +
           randomByte();
  if (isPrivate(ip)) return randomIp();
  return ip;
}

var isPrivate = function(ip) {
  return /^10\.|^192\.168\.|^172\.16\.|^172\.17\.|^172\.18\.|^172\.19\.|^172\.20\.|^172\.21\.|^172\.22\.|^172\.23\.|^172\.24\.|^172\.25\.|^172\.26\.|^172\.27\.|^172\.28\.|^172\.29\.|^172\.30\.|^172\.31\./.test(ip);
}

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';
var caller = 'hepgenjs';
var caller_e164 = '+'+rand(1,99)+'555'+rand(100000,999999);
var callee = rand(101,199);
var domain = 'sipcapture.org';
var priv_ip = '192.168.10.'+rand(10,200);
var priv_nat = randomIp();
var pub_ip= randomIp();
var peer_ip=randomIp();
var localhost = '127.0.0.1';

var useragent = 'HEPGEN.JS@sipcapture.org';

// tag

var config = {
        NAME: 'SIP B2BUA Session + Logs',
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
	'INVITE sip:'+callee+'@'+domain+';user=phone SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK923381359;rport\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 INVITE\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\r\n'+
	'Max-Forwards: 70\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Privacy: none\r\n'+
	'P-Preferred-Identity: <sip:'+caller+'@'+domain+';user=phone>\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Accept: application/sdp, application/dtmf-relay\r\n'+
	'Content-Length:   313\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o='+caller+' 8000 8000 IN IP4 '+priv_ip+'\r\n'+
	's=SIP Call\r\n'+
	'c=IN IP4 '+priv_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 5004 RTP/AVP 0 8 9 18 101\r\n'+
	'a=sendrecv\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=ptime:20\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:9 G722/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-15\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 INVITE\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
	'P-Auth-IP: '+priv_nat+'\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 INVITE\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 407 Proxy Authentication Required\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 INVITE\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
	'P-Auth-IP: '+priv_nat+'\r\n'+
	'P-Auth-UA: '+useragent+'\r\n'+
	'Proxy-Authenticate: Digest realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z"\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 407 Proxy Authentication Required\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 INVITE\r\n'+
	'Proxy-Authenticate: Digest realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z"\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'ACK sip:'+callee+'@'+domain+';user=phone SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK923381359;rport\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 ACK\r\n'+
	'Content-Length: 0\r\n'+
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
	'INVITE sip:'+callee+'@'+domain+';user=phone SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK104237110;rport\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\r\n'+
	'Proxy-Authorization: Digest username="'+caller+'", realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z", uri="sip:'+callee+'@'+domain+';user=phone", response="a83968423badaffff81955d3d1ba944d", algorithm=MD5\r\n'+
	'Max-Forwards: 70\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Privacy: none\r\n'+
	'P-Preferred-Identity: <sip:'+caller+'@'+domain+';user=phone>\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Accept: application/sdp, application/dtmf-relay\r\n'+
	'Content-Length:   313\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o='+caller+' 8000 8000 IN IP4 '+priv_ip+'\r\n'+
	's=SIP Call\r\n'+
	'c=IN IP4 '+priv_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 5004 RTP/AVP 0 8 9 18 101\r\n'+
	'a=sendrecv\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=ptime:20\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:9 G722/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-15\r\n'+
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
	'ACK sip:'+callee+'@'+domain+';user=phone SIP/2.0\r\n'+
	'Max-Forwards: 10\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK008.4171ec66f99b948ab62008e62a6491c1.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK923381359;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.0385\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 440 ACK\r\n'+
	'Content-Length: 0\r\n'+
	'P-Src-Ip: '+priv_nat+'\r\n'+
	'P-Src-Port: 5064\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
	'P-Sock-Info: udp:'+pub_ip+':5060\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
	'P-Auth-IP: '+priv_nat+'\r\n'+
	'P-Auth-UA: '+useragent+'\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 101 Connecting\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
	'P-Auth-IP: '+priv_nat+'\r\n'+
	'P-Auth-UA: '+useragent+'\r\n'+
	'P-Authorization: '+caller+'\r\n'+
	'P-Authorized: 1\r\n'+
	'P-Caller-UUID: 8f38d8a9-2152-408d-ab05-c587a52bb89a\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 Connecting\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bK108.7a23429f0ff569e334535fa224937400.0;received=127.0.0.1\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.b3688c839f95242bceba6f2ddb22e5a8.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'Server: Application Server\r\n'+
	'Contact: <sip:'+callee+'@127.0.0.1:5080>\r\n'+
	'Content-Length: 0\r\n'+
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
	'INVITE sip:'+callee+'@'+peer_ip+':5060;transport=udp SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'Contact: <sip:127.0.0.1:5080>\r\n'+
	'Route: <sip:127.0.0.1:5060;received=\'sip:'+peer_ip+':5060;transport=udp\';lr>\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Accept: application/sdp, application/dtmf-relay\r\n'+
	'P-Asserted-Identity: <sip:'+caller_e164+'@'+domain+'>\r\n'+
	'P-D-Uri: sip:127.0.0.1:5060;received=\'sip:'+peer_ip+':5060;transport=udp\'\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Content-Length: 377\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o='+caller+' 8000 8000 IN IP4 '+pub_ip+'\r\n'+
	's=SIP Call\r\n'+
	'c=IN IP4 '+pub_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 31954 RTP/AVP 0 8 9 18 101\r\n'+
	'a=sendrecv\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=ptime:20\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:9 G722/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-15\r\n'+
	'a=direction:active\r\n'+
	'a=oldmediaip:'+priv_ip+'\r\n'+
	'a=rtcp:31955\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Content-Length: 0\r\n'+
	'P-Src-Ip: '+peer_ip+'\r\n'+
	'P-Src-Port: 5060\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
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
	'SIP/2.0 100 trying -- your call is important to us\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 trying -- your call is important to us\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Content-Length: 0\r\n'+
	'P-Src-Ip: '+peer_ip+'\r\n'+
	'P-Src-Port: 5060\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.2469d7e5f9b74442c0453dffe9b89adf.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
	'Supported: replaces\r\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Content-Length: 311\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o=root 11882 11882 IN IP4 '+peer_ip+'\r\n'+
	's=session\r\n'+
	'c=IN IP4 '+peer_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 12366 RTP/AVP 8 0 18 101\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-16\r\n'+
	'a=silenceSupp:off - - - -\r\n'+
	'a=ptime:20\r\n'+
	'a=sendrecv\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKhD1m8aH6;rport=5080\r\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'CSeq: 10 INVITE\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
	'Supported: replaces\r\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Content-Length: 311\r\n'+
	'P-Src-Ip: '+peer_ip+'\r\n'+
	'P-Src-Port: 5060\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o=root 11882 11882 IN IP4 '+peer_ip+'\r\n'+
	's=session\r\n'+
	'c=IN IP4 '+peer_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 12366 RTP/AVP 8 0 18 101\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-16\r\n'+
	'a=silenceSupp:off - - - -\r\n'+
	'a=ptime:20\r\n'+
	'a=sendrecv\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK104237110;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 INVITE\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
	'Supported: replaces\r\n'+
	'Content-Type: application/sdp\r\n'+
	'Content-Length: 329\r\n'+
	'Contact: <sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw>\r\n'+
	'\r\n'+
	'v=0\r\n'+
	'o=root 11882 11882 IN IP4 '+pub_ip+'\r\n'+
	's=session\r\n'+
	'c=IN IP4 '+pub_ip+'\r\n'+
	't=0 0\r\n'+
	'm=audio 31956 RTP/AVP 8 0 18 101\r\n'+
	'a=rtpmap:8 PCMA/8000\r\n'+
	'a=rtpmap:0 PCMU/8000\r\n'+
	'a=rtpmap:18 G729/8000\r\n'+
	'a=fmtp:18 annexb=no\r\n'+
	'a=rtpmap:101 telephone-event/8000\r\n'+
	'a=fmtp:101 0-16\r\n'+
	'a=silenceSupp:off - - - -\r\n'+
	'a=ptime:20\r\n'+
	'a=sendrecv\r\n'+
	'a=rtcp:31957\r\n'+
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
	'ACK sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK1536455165;rport\r\n'+
	'Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 ACK\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\r\n'+
	'Proxy-Authorization: Digest username="'+caller+'", realm="'+domain+'", nonce="VuRZ5VbkWLkkVKJ9B1rBIN9Q3nRbqc9z", uri="sip:'+callee+'@'+domain+';user=phone", response="a83968423badaffff81955d3d1ba944d", algorithm=MD5\r\n'+
	'Max-Forwards: 70\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
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
	'ACK sip:127.0.0.1:5080 SIP/2.0\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bK108.0fd09acb0f53e63bd1f6a6e0953c2f1d.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bK108.5ae58236d6ead15f6ae2d0eaa55bcccd.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK1536455165;rport=5064\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 441 ACK\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\r\n'+
	'Max-Forwards: 68\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
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
	'ACK sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKarC4XaNK;rport\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'CSeq: 10 ACK\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'Contact: <sip:127.0.0.1:5080>\r\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
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
	'ACK sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\r\n'+
	'Max-Forwards: 10\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK3365.4e589db6a3d69d4d4ee211444d6d8d29.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bKarC4XaNK;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'CSeq: 10 ACK\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
	'Contact: <sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw>\r\n'+
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
	'BYE sip:lb@'+pub_ip+':5060;ngcpct=c2lwOjEyNy4wLjAuMTo1MDgw SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;branch=z9hG4bK829262785;rport\r\n'+
	'Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;user=phone>\r\n'+
	'Max-Forwards: 70\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
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
	'BYE sip:127.0.0.1:5080 SIP/2.0\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;did=d5d.c191;mpd=ii;ice_caller=strip;ice_callee=strip;rtpprx=yes;vsf=YlB4MwAQcRpkPgIJNBwOYAhoe188D24/UEcsTigdagkbLCgy>\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\r\n'+
	'Max-Forwards: 69\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
	'P-Src-Ip: '+priv_nat+'\r\n'+
	'P-Src-Port: 5064\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
	'P-Sock-Info: udp:'+pub_ip+':5060\r\n'+
	'P-Src-Nat: 1\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
	'P-Auth-IP: '+priv_nat+'\r\n'+
	'P-Auth-UA: '+useragent+'\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 100 Trying\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Server: SIP Proxy\r\n'+
	'Content-Length: 0\r\n'+
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
	'BYE sip:127.0.0.1:5080 SIP/2.0\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bKef7.c1f3367df5cff89f98058ed5508fce22.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Contact: <sip:'+caller+'@'+priv_ip+':5064;alias='+priv_nat+'~5064~1;user=phone>\r\n'+
	'Max-Forwards: 68\r\n'+
	'Supported: replaces, path, timer, eventlist\r\n'+
	'User-Agent: '+useragent+'\r\n'+
	'Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE, MESSAGE\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5062;branch=z9hG4bKef7.c1f3367df5cff89f98058ed5508fce22.0;received=127.0.0.1\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Server: Application Server\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1;branch=z9hG4bKef7.abfc04310a6de51d3c2cd97b1a12fe11.0\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Server: Application Server\r\n'+
	'Content-Length: 0\r\n'+
	'P-Out-Socket: udp:'+pub_ip+':5060\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Record-Route: <sip:127.0.0.1:5062;lr=on;ftag=415746302;rtpprx=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=415746302;nat=yes;lb=yes;socket=udp:'+pub_ip+':5060>\r\n'+
	'Via: SIP/2.0/UDP '+priv_ip+':5064;received='+priv_nat+';branch=z9hG4bK829262785;rport=5064\r\n'+
	'From: <sip:'+caller+'@'+domain+';user=phone>;tag=415746302\r\n'+
	'To: <sip:'+callee+'@'+domain+';user=phone>;tag=7DB80AAE-56E458BB0008256B-B7852700\r\n'+
	'Call-ID: '+call_id+'\r\n'+
	'CSeq: 442 BYE\r\n'+
	'Server: Application Server\r\n'+
	'Content-Length: 0\r\n'+
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
	'BYE sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'CSeq: 11 BYE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>, <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Content-Length: 0\r\n'+
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
	'BYE sip:'+callee+'@'+peer_ip+':7070 SIP/2.0\r\n'+
	'Max-Forwards: 10\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'CSeq: 11 BYE\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Via: SIP/2.0/UDP '+pub_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\r\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'CSeq: 11 BYE\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
	'Supported: replaces\r\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\r\n'+
	'Content-Length: 0\r\n'+
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
	'SIP/2.0 200 OK\r\n'+
	'Via: SIP/2.0/UDP 127.0.0.1:5080;branch=z9hG4bK3.dYFaLV;rport=5080\r\n'+
	'Record-Route: <sip:'+peer_ip+';lr;ftag=06DE7CEB-56E458BB000864AD-B855F700>\r\n'+
	'Record-Route: <sip:'+pub_ip+';r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'Record-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=06DE7CEB-56E458BB000864AD-B855F700;lb=yes>\r\n'+
	'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
	'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
	'Call-ID: '+call_id+'_b2b-1\r\n'+
	'CSeq: 11 BYE\r\n'+
	'User-Agent: HEPeer\r\n'+
	'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
	'Supported: replaces\r\n'+
	'Contact: <sip:'+callee+'@'+peer_ip+':7070>\r\n'+
	'Content-Length: 0\r\n'+
	'P-Src-Ip: '+peer_ip+'\r\n'+
	'P-Src-Port: 5060\r\n'+
	'P-Src-Proto: udp\r\n'+
	'P-Src-Af: 4\r\n'+
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
