/* HEPGEN Autogenerated from file => pcap2021-08-17T16 22 30.428Z.txt */
var callId = Math.random().toString(36).substring(7) + '@127.0.0.1';

var config = {
	NAME:"HEPGEN Simple Call 1 Leg for Looping",
	HEP_SERVER:"127.0.0.1",
	HEP_PORT:9060,
	HEP_ID:"2001",
	HEP_AUTH:"myHep",
	MESSAGES: [
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"169.141.53.213",
				dstIp:"137.25.72.83",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"INVITE sip:5000@sip.botauro.com SIP/2.0\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nMax-Forwards: 70\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nContact: <sip:405@sip.botauro.com>\r\nCall-ID: "+callId+"\r\nCSeq: 31911 INVITE\r\nAllow: PRACK, INVITE, ACK, BYE, CANCEL, UPDATE, INFO, SUBSCRIBE, NOTIFY, REFER, MESSAGE, OPTIONS\r\nSupported: replaces, 100rel, timer, norefersub\r\nSession-Expires: 1800\r\nMin-SE: 90\r\nUser-Agent: Hepgen/123\r\nContent-Type: application/sdp\r\nContent-Length:   319\r\n\r\nv=0\r\no=- 3837167151 3837167151 IN IP4 192.168.153.1\r\ns=HepGen 127.0.0.1\r\nb=AS:84\r\nt=0 0\r\na=X-nat:0\r\nm=audio 4000 RTP/AVP 8 101\r\nc=IN IP4 192.168.153.1\r\nb=TIAS:64000\r\na=rtcp:4001 IN IP4 192.168.153.1\r\na=sendrecv\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=ssrc:1889210388 cname:1a107f3e441a1640\r\n\r\n",
		},
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"137.25.72.83",
				dstIp:"169.141.53.213",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"SIP/2.0 100 Trying\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nCall-ID: "+callId+"\r\nCSeq: 31911 INVITE\r\nServer: Hepgen Fake 123\r\nAllow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY, INFO, PUBLISH, MESSAGE\r\nSupported: replaces, timer\r\nSession-Expires: 1800;refresher=uas\r\nContact: <sip:405@sip.botauro.com>\r\nContent-Length:   319\r\n\r\n",
		},
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"137.25.72.83",
				dstIp:"169.141.53.213",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"SIP/2.0 200 OK\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nCall-ID: "+callId+"\r\nCSeq: 31911 INVITE\r\nServer: Hepgen Fake 123\r\nAllow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY, INFO, PUBLISH, MESSAGE\r\nSupported: replaces, timer\r\nSession-Expires: 1800;refresh=uas\r\nContact: <sip:405@sip.botauro.com>\r\nRequire: timer\r\nContent-Type: application/sdp\r\nContent-Length:   254\r\n\r\nv=0\r\no=root 1850387284 1850387284 IN IP4 169.141.53.213\r\ns=Asterisk PBX 16.17.0.1\r\nc=IN IP4 169.141.53.213\r\nt=0 0\r\nm=audio 16110 RTP/AVP 8 101\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=ptime:20\r\na=maxptime:150\r\na=sendrecv\r\n\r\n",
		},
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"169.141.53.213",
				dstIp:"137.25.72.83",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"ACK sip:5000@sip.botauro.com SIP/2.0\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nMax-Forwards: 70\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nContact: <sip:405@sip.botauro.com>\r\nCall-ID: "+callId+"\r\nCSeq: 31911 ACK\r\nUser-Agent: Hepgen/123\r\nContent-Length:   0\r\n\r\n\r\n",
		},
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"137.25.72.83",
				dstIp:"169.141.53.213",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"BYE sip:5000@sip.botauro.com SIP/2.0\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nMax-Forwards: 70\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nCall-ID: "+callId+"\r\nCSeq: 102 BYE\r\nUser-Agent: Hepgen/123\r\nContent-Length:   0\r\n\r\n\r\n",
		},
		{
			rcinfo:{
				type:"HEP",
				version:3,
				payload_type:1,
				captureId:"2001",
				capturePass:"myHep",
				ip_family:2,
				protocol:17,
				proto_type:1,
				srcIp:"169.141.53.213",
				dstIp:"137.25.72.83",
				srcPort:5060,
				dstPort:5060,
			},
			pause:1,
			payload:"SIP/2.0 200 OK\r\nVia: SIP/2.0/UDP 169.141.53.213:5060\r\nCall-ID: "+callId+"\r\nFrom: <sip:405@sip.botauro.com>\r\nTo: <sip:5000@sip.botauro.com>\r\nCSeq: 102 BYE\r\nContent-Length:   0\r\n\r\n\r\n",
		},
	]
};
module.exports = config;
