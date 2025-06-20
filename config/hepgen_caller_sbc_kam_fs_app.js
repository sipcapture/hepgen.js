
// Full A-leg and B-leg SIP B2BUA Call with proper Call-ID and x-cid correlation

var call_id = 'call-' + Date.now();
var a_leg_call_id = call_id;
var b_leg_call_id = call_id + '_b2b-1';

var caller = 'hepgenjs';
var callee = '9876';
var domain = 'sipcapture.org';

var priv_ip = '192.168.1.10';
var priv_nat = '192.168.1.11';
var pub_ip = '192.168.1.12';
var peer_ip = '192.168.1.13';
var app_ip = '192.168.1.14';

// Auto-generated SIP flow with full forward and reverse paths
var config = {
	NAME: 'Full SIP Call Flow',
	HEP_SERVER: '127.0.0.1',
	HEP_PORT: 9063,
	HEP_ID: '2010',
	HEP_AUTH: 'myHep',
	MESSAGES: [
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.10', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// === Responses (200 OK) back ===
		// 100 Trying: App → FS
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 100 Trying: FS → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 100 Trying: Kamailio → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 100 Trying: SBC → Caller
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.10', srcPort: 5060, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},
		// 180 Ringing: App → FS
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 180 Ringing: FS → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 180 Ringing: Kamailio → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 180 Ringing: SBC → Caller
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.10', srcPort: 5060, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.10', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// ACK, BYE and 200 OK (BYE) will continue from here...
		// ACK from Caller → App through all hops
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.10', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// BYE from Caller → App
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.10', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 200 OK (BYE) from App → Caller
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: '2010', capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.10', srcPort: 5060, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		}
	]
};

module.exports = config;

