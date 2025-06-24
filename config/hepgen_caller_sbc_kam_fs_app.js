// Full A-leg and B-leg SIP B2BUA Call with proper Call-ID and x-cid correlation
// EXTENDED WITH RTP MEDIA REPORTS - COMPLETE CORRECTED VERSION

//var call_id = 'call-' + Date.now();
//var a_leg_call_id = call_id;
//var b_leg_call_id = call_id + '_b2b';
//var c_leg_call_id = call_id + '_b2b';
//var d_leg_call_id = 'call-' + Date.now();

function generateCallId() {
    return Date.now() + '-' + Math.floor(Math.random() * 100000);
}

// Generate IDs
var a_leg_call_id = generateCallId();
var b2b_call_id = generateCallId(); // Shared by b_leg and c_leg
var b_leg_call_id = b2b_call_id;
var c_leg_call_id = b2b_call_id;
var d_leg_call_id = generateCallId();


var caller = 'hepgenjs';
var callee = '9876';
var domain = 'sipcapture.org';

var priv_ip = '192.168.1.10';
var priv_nat = '192.168.1.11';
var pub_ip = '192.168.1.12';
var peer_ip = '192.168.1.13';
var app_ip = '192.168.1.14';

var rand = function(maximum,minimum,even){
	var final = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	if (even && final % 2 != 0) final++;
	return final;
}

var randomByte = function() {
	return Math.round(Math.random()*254);
}

// RTP port allocation for media streams - 3 legs
var rtpPorts = {
	// Leg 1: UAC ↔ SBC (A-leg)
	uac_sbc: {
		uac_rtp: 10020,
		uac_rtcp: 10021,
		sbc_rtp: 20020,
		sbc_rtcp: 20021
	},
	// Leg 2: SBC ↔ FreeSWITCH (B-leg part 1)
	sbc_fs: {
		sbc_rtp: 30020,
		sbc_rtcp: 30021,
		fs_rtp: 40020,
		fs_rtcp: 40021
	},
	// Leg 3: FreeSWITCH ↔ App (B-leg part 2)
	fs_app: {
		fs_rtp: 50020,
		fs_rtcp: 50021,
		app_rtp: 60020,
		app_rtcp: 60021
	}
};

// Helper function to generate realistic RTP statistics
function generateRTPStats(direction, timestamp, reportNumber) {
	var packetsPerSecond = 50; // 20ms ptime
	var packetsTotal = Math.floor((timestamp / 1000) * packetsPerSecond);
	var bytesPerPacket = 160; // G.711 20ms frame
	var currentPackets = packetsTotal + (reportNumber * 250);

	var jitter = (Math.random() * 0.02).toFixed(3); // 0-0.02ms
	var delta = (19.983 + (Math.random() * 2 - 1)).toFixed(3);
	var mos = (4.0 + Math.random() * 0.4).toFixed(3); // 4.0-4.4 range


	return {
		DELTA: parseFloat(delta),
		JITTER: parseFloat(jitter),
		REPORT_TS: timestamp / 1000,
		TL_BYTE: currentPackets * bytesPerPacket,
		SKEW: 0.000,
		TOTAL_PK: currentPackets,
		EXPECTED_PK: currentPackets,
		PACKET_LOSS: Math.floor(Math.random() * 2),
		SEQ: 0,
		MAX_JITTER: parseFloat((parseFloat(jitter) + 0.005).toFixed(3)),
		MAX_DELTA: parseFloat((parseFloat(delta) + 0.5).toFixed(3)),
		MAX_SKEW: parseFloat((Math.random() * 0.2).toFixed(3)),
		MEAN_JITTER: parseFloat((parseFloat(jitter) * 0.8).toFixed(3)),
		MIN_MOS: parseFloat((parseFloat(mos) - 0.05).toFixed(3)),
		MEAN_MOS: parseFloat(mos),
		MOS: parseFloat(mos),
		RFACTOR: (75 + Math.random() * 15).toFixed(1),
		MIN_RFACTOR: (70 + Math.random() * 10).toFixed(1),
		MEAN_RFACTOR: (80 + Math.random() * 10).toFixed(1),
		OUT_ORDER: 0,
		SSRC_CHG: 0,
		CODEC_PT: 9,
		CLOCK: 8000,
		CODEC_NAME: "g722",
		SRC_MAC: "00-30-48-7E-5D-C6",
		DST_MAC: "00-12-80-D7-38-5E"
	};
}

// SSRC values for each stream (6 streams total)
var ssrcValues = {
	// Leg 1: UAC ↔ SBC
	uac_to_sbc: 0x12345678,
	sbc_to_uac: 0x87654321,
	// Leg 2: SBC ↔ FreeSWITCH  
	sbc_to_fs: 0xABCDEF01,
	fs_to_sbc: 0x10FEDCBA,
	// Leg 3: FreeSWITCH ↔ App
	fs_to_app: 0x11223344,
	app_to_fs: 0x44332211
};

// Function to create RTP media reports for all 3 legs
function createMediaReports() {

	var mediaReports = [];
	var baseTime = Date.now();

	// Track MOS values for coherent final reports
	var mosTracker = {
		uac_to_sbc: [],
		sbc_to_uac: [],
		sbc_to_fs: [],
		fs_to_sbc: [],
		fs_to_app: [],
		app_to_fs: []
	};

	let duration = Math.floor((Math.random() * 10)) + 1 // Never 0, will be 10 times longer

	// Generate duration*10 periodic reports every 10 seconds
	for (let i = 1; i <= duration; i++) {
		let currentTime = baseTime + (i * 10000); // 10 second intervals

		// === LEG 1: UAC ↔ SBC (A-leg) ===
		// UAC → SBC
		let uac_to_sbc_stats = generateRTPStats({ssrc: ssrcValues.uac_to_sbc}, currentTime, i);
		mosTracker.uac_to_sbc.push(uac_to_sbc_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: a_leg_call_id,
				srcIp: priv_ip, dstIp: priv_nat,
				srcPort: rtpPorts.uac_sbc.uac_rtp, dstPort: rtpPorts.uac_sbc.sbc_rtp,
				mos: Math.floor(uac_to_sbc_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000)
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+uac_to_sbc_stats.DELTA+',"JITTER":'+uac_to_sbc_stats.JITTER+',"REPORT_TS":'+uac_to_sbc_stats.REPORT_TS+',"TL_BYTE":'+uac_to_sbc_stats.TL_BYTE+',"SKEW":'+uac_to_sbc_stats.SKEW+',"TOTAL_PK":'+uac_to_sbc_stats.TOTAL_PK+',"EXPECTED_PK":'+uac_to_sbc_stats.EXPECTED_PK+',"PACKET_LOSS":'+uac_to_sbc_stats.PACKET_LOSS+',"SEQ":'+uac_to_sbc_stats.SEQ+',"MAX_JITTER":'+uac_to_sbc_stats.MAX_JITTER+',"MAX_DELTA":'+uac_to_sbc_stats.MAX_DELTA+',"MAX_SKEW":'+uac_to_sbc_stats.MAX_SKEW+',"MEAN_JITTER":'+uac_to_sbc_stats.MEAN_JITTER+',"MIN_MOS":'+uac_to_sbc_stats.MIN_MOS+', "MEAN_MOS":'+uac_to_sbc_stats.MEAN_MOS+', "MOS":'+uac_to_sbc_stats.MOS+',"RFACTOR":'+uac_to_sbc_stats.RFACTOR+',"MIN_RFACTOR":'+uac_to_sbc_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+uac_to_sbc_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_ip+'", "SRC_PORT":'+rtpPorts.uac_sbc.uac_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"SRC_MAC":"'+uac_to_sbc_stats.SRC_MAC+'","DST_MAC":"'+uac_to_sbc_stats.DST_MAC+'","OUT_ORDER":'+uac_to_sbc_stats.OUT_ORDER+',"SSRC_CHG":'+uac_to_sbc_stats.SSRC_CHG+',"CODEC_PT":'+uac_to_sbc_stats.CODEC_PT+', "CLOCK":'+uac_to_sbc_stats.CLOCK+',"CODEC_NAME":"'+uac_to_sbc_stats.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_ip+':'+rtpPorts.uac_sbc.uac_rtp+'","PARTY":0,"TYPE":"PERIODIC"}'
		});

		// SBC → UAC
		let sbc_to_uac_stats = generateRTPStats({ssrc: ssrcValues.sbc_to_uac}, currentTime, i);
		mosTracker.sbc_to_uac.push(sbc_to_uac_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: a_leg_call_id,
				srcIp: priv_nat, dstIp: priv_ip,
				srcPort: rtpPorts.uac_sbc.sbc_rtp, dstPort: rtpPorts.uac_sbc.uac_rtp,
				mos: Math.floor(sbc_to_uac_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 100
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+sbc_to_uac_stats.DELTA+',"JITTER":'+sbc_to_uac_stats.JITTER+',"REPORT_TS":'+sbc_to_uac_stats.REPORT_TS+',"TL_BYTE":'+sbc_to_uac_stats.TL_BYTE+',"SKEW":'+sbc_to_uac_stats.SKEW+',"TOTAL_PK":'+sbc_to_uac_stats.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_uac_stats.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_uac_stats.PACKET_LOSS+',"SEQ":'+sbc_to_uac_stats.SEQ+',"MAX_JITTER":'+sbc_to_uac_stats.MAX_JITTER+',"MAX_DELTA":'+sbc_to_uac_stats.MAX_DELTA+',"MAX_SKEW":'+sbc_to_uac_stats.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_uac_stats.MEAN_JITTER+',"MIN_MOS":'+sbc_to_uac_stats.MIN_MOS+', "MEAN_MOS":'+sbc_to_uac_stats.MEAN_MOS+', "MOS":'+sbc_to_uac_stats.MOS+',"RFACTOR":'+sbc_to_uac_stats.RFACTOR+',"MIN_RFACTOR":'+sbc_to_uac_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_uac_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.uac_sbc.sbc_rtp+', "DST_IP":"'+priv_ip+'","DST_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"SRC_MAC":"'+sbc_to_uac_stats.SRC_MAC+'","DST_MAC":"'+sbc_to_uac_stats.DST_MAC+'","OUT_ORDER":'+sbc_to_uac_stats.OUT_ORDER+',"SSRC_CHG":'+sbc_to_uac_stats.SSRC_CHG+',"CODEC_PT":'+sbc_to_uac_stats.CODEC_PT+', "CLOCK":'+sbc_to_uac_stats.CLOCK+',"CODEC_NAME":"'+sbc_to_uac_stats.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.uac_sbc.sbc_rtp+'","PARTY":0,"TYPE":"PERIODIC"}'
		});

		// RTCP Stats
		
		// UAC -> SBC
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
                                captureId: 2010, capturePass: 'myHep', ip_family: 2,
	                        protocol: 17,
	                        proto_type: 34,
	                        srcIp: priv_ip,
	                        dstIp: priv_nat,
	                        srcPort: rtpPorts.uac_sbc.uac_rtp,
	                        dstPort: rtpPorts.uac_sbc.sbc_rtp,
	                        correlation_id: a_leg_call_id,
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 100
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id + '","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","SR_DELAY":0,"INTERARRIVAL_JITTER":0,"REPORT_TS":'+uac_to_sbc_stats.REPORT_TS+',"TOTAL_PK":'+uac_to_sbc_stats.TOTAL_PK+',"TOTAL_RTCP_PK":14,"CUM_PACKET_LOSS":'+uac_to_sbc_stats.PACKET_LOSS+',"PERCENTAGE_LOSS":0,"MAX_INTERARRIVAL_JITTER":'+(uac_to_sbc_stats.MAX_JITTER+150)+',"MAX_SR_DELAY":0,"MAX_PERCENTAGE_LOSS":0.391,"MEAN_PERCENTAGE_LOSS":0.055,"MEAN_INTERARRIVAL_JITTER":'+(uac_to_sbc_stats.MEAN_JITTER+150)+',"MIN_MOS":'+(uac_to_sbc_stats.MIN_MOS-1)+',"MEAN_MOS":'+(uac_to_sbc_stats.MEAN_MOS-1).toFixed(3)+',"MOS":'+(uac_to_sbc_stats.MOS-1).toFixed(3)+',"RFACTOR":'+uac_to_sbc_stats.RFACTOR+',"MIN_RFACTOR":'+uac_to_sbc_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+uac_to_sbc_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_ip+'","SRC_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"OCTET_COUNT":208160,"SSRC_CHG":'+uac_to_sbc_stats.SSRC_CHG+',"PKT_TYPE_REPORT":[200,0,0],"HIGH_EXT_SEQ":12656,"SSRC":"0xedc34144","DIR":0,"REPORT_NAME":"'+priv_ip+':'+rtpPorts.uac_sbc.uac_rtp+'","PARTY":0,"IP_QOS":0,"INFO_VLAN":0,"VIDEO":0,"REPORT_START":'+Math.floor((currentTime/1000)-10000)+',"REPORT_END":'+Math.floor((currentTime/1000)+100)+',"TYPE":"PERIODIC","STYPE":"HEPAGENT-RTCP-1.1.107","SOURCE":"RTCP"}'
		});

		// SBC -> UAC
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
                                captureId: 2010, capturePass: 'myHep', ip_family: 2,
	                        protocol: 17,
	                        proto_type: 34,
	                        srcIp: priv_nat,
	                        dstIp: priv_ip,
	                        srcPort: rtpPorts.uac_sbc.sbc_rtp,
	                        dstPort: rtpPorts.uac_sbc.uac_rtp,
	                        correlation_id: a_leg_call_id,
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 100
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id + '","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","SR_DELAY":0,"INTERARRIVAL_JITTER":0,"REPORT_TS":'+sbc_to_uac_stats.REPORT_TS+',"TOTAL_PK":'+sbc_to_uac_stats.TOTAL_PK+',"TOTAL_RTCP_PK":14,"CUM_PACKET_LOSS":'+sbc_to_uac_stats.PACKET_LOSS+',"PERCENTAGE_LOSS":0,"MAX_INTERARRIVAL_JITTER":'+(sbc_to_uac_stats.MAX_JITTER+150)+',"MAX_SR_DELAY":0,"MAX_PERCENTAGE_LOSS":0.391,"MEAN_PERCENTAGE_LOSS":0.055,"MEAN_INTERARRIVAL_JITTER":'+(sbc_to_uac_stats.MEAN_JITTER+150)+',"MIN_MOS":'+(sbc_to_uac_stats.MIN_MOS-1).toFixed(3)+',"MEAN_MOS":'+(sbc_to_uac_stats.MEAN_MOS-1).toFixed(3)+',"MOS":'+(sbc_to_uac_stats.MOS-1).toFixed(3)+',"RFACTOR":'+sbc_to_uac_stats.RFACTOR+',"MIN_RFACTOR":'+sbc_to_uac_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_uac_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'","SRC_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"DST_IP":"'+priv_ip+'","DST_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"OCTET_COUNT":208160,"SSRC_CHG":'+sbc_to_uac_stats.SSRC_CHG+',"PKT_TYPE_REPORT":[200,0,0],"HIGH_EXT_SEQ":12656,"SSRC":"0xedc34144","DIR":0,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.uac_sbc.sbc_rtp+'","PARTY":0,"IP_QOS":0,"INFO_VLAN":0,"VIDEO":0,"REPORT_START":'+Math.floor((currentTime/1000)-10000)+',"REPORT_END":'+Math.floor(currentTime/1000)+100+',"TYPE":"PERIODIC","STYPE":"HEPAGENT-RTCP-1.1.107","SOURCE":"RTCP"}'
		});
		
		// === LEG 2: SBC ↔ FreeSWITCH (B-leg part 1) ===
		// SBC → FreeSWITCH
		let sbc_to_fs_stats = generateRTPStats({ssrc: ssrcValues.sbc_to_fs}, currentTime, i);
		mosTracker.sbc_to_fs.push(sbc_to_fs_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: b_leg_call_id,
				srcIp: priv_nat, dstIp: peer_ip,
				srcPort: rtpPorts.sbc_fs.sbc_rtp, dstPort: rtpPorts.sbc_fs.fs_rtp,
				mos: Math.floor(sbc_to_fs_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 200
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+sbc_to_fs_stats.DELTA+',"JITTER":'+sbc_to_fs_stats.JITTER+',"REPORT_TS":'+sbc_to_fs_stats.REPORT_TS+',"TL_BYTE":'+sbc_to_fs_stats.TL_BYTE+',"SKEW":'+sbc_to_fs_stats.SKEW+',"TOTAL_PK":'+sbc_to_fs_stats.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_fs_stats.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_fs_stats.PACKET_LOSS+',"SEQ":'+sbc_to_fs_stats.SEQ+',"MAX_JITTER":'+sbc_to_fs_stats.MAX_JITTER+',"MAX_DELTA":'+sbc_to_fs_stats.MAX_DELTA+',"MAX_SKEW":'+sbc_to_fs_stats.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_fs_stats.MEAN_JITTER+',"MIN_MOS":'+sbc_to_fs_stats.MIN_MOS+', "MEAN_MOS":'+sbc_to_fs_stats.MEAN_MOS+', "MOS":'+sbc_to_fs_stats.MOS+',"RFACTOR":'+sbc_to_fs_stats.RFACTOR+',"MIN_RFACTOR":'+sbc_to_fs_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_fs_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.sbc_fs.sbc_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.sbc_fs.fs_rtp+',"SRC_MAC":"'+sbc_to_fs_stats.SRC_MAC+'","DST_MAC":"'+sbc_to_fs_stats.DST_MAC+'","OUT_ORDER":'+sbc_to_fs_stats.OUT_ORDER+',"SSRC_CHG":'+sbc_to_fs_stats.SSRC_CHG+',"CODEC_PT":'+sbc_to_fs_stats.CODEC_PT+', "CLOCK":'+sbc_to_fs_stats.CLOCK+',"CODEC_NAME":"'+sbc_to_fs_stats.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.sbc_fs.sbc_rtp+'","PARTY":1,"TYPE":"PERIODIC"}'
		});

		// FreeSWITCH → SBC
		let fs_to_sbc_stats = generateRTPStats({ssrc: ssrcValues.fs_to_sbc}, currentTime, i);
		mosTracker.fs_to_sbc.push(fs_to_sbc_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: b_leg_call_id,
				srcIp: peer_ip, dstIp: priv_nat,
				srcPort: rtpPorts.sbc_fs.fs_rtp, dstPort: rtpPorts.sbc_fs.sbc_rtp,
				mos: Math.floor(fs_to_sbc_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 300
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_sbc_stats.DELTA+',"JITTER":'+fs_to_sbc_stats.JITTER+',"REPORT_TS":'+fs_to_sbc_stats.REPORT_TS+',"TL_BYTE":'+fs_to_sbc_stats.TL_BYTE+',"SKEW":'+fs_to_sbc_stats.SKEW+',"TOTAL_PK":'+fs_to_sbc_stats.TOTAL_PK+',"EXPECTED_PK":'+fs_to_sbc_stats.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_sbc_stats.PACKET_LOSS+',"SEQ":'+fs_to_sbc_stats.SEQ+',"MAX_JITTER":'+fs_to_sbc_stats.MAX_JITTER+',"MAX_DELTA":'+fs_to_sbc_stats.MAX_DELTA+',"MAX_SKEW":'+fs_to_sbc_stats.MAX_SKEW+',"MEAN_JITTER":'+fs_to_sbc_stats.MEAN_JITTER+',"MIN_MOS":'+fs_to_sbc_stats.MIN_MOS+', "MEAN_MOS":'+fs_to_sbc_stats.MEAN_MOS+', "MOS":'+fs_to_sbc_stats.MOS+',"RFACTOR":'+fs_to_sbc_stats.RFACTOR+',"MIN_RFACTOR":'+fs_to_sbc_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_sbc_stats.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.sbc_fs.fs_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.sbc_fs.sbc_rtp+',"SRC_MAC":"'+fs_to_sbc_stats.SRC_MAC+'","DST_MAC":"'+fs_to_sbc_stats.DST_MAC+'","OUT_ORDER":'+fs_to_sbc_stats.OUT_ORDER+',"SSRC_CHG":'+fs_to_sbc_stats.SSRC_CHG+',"CODEC_PT":'+fs_to_sbc_stats.CODEC_PT+', "CLOCK":'+fs_to_sbc_stats.CLOCK+',"CODEC_NAME":"'+fs_to_sbc_stats.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.sbc_fs.fs_rtp+'","PARTY":1,"TYPE":"PERIODIC"}'
		});

		// === LEG 3: FreeSWITCH ↔ App (B-leg part 2) ===
		// FreeSWITCH → App
		let fs_to_app_stats = generateRTPStats({ssrc: ssrcValues.fs_to_app}, currentTime, i);
		mosTracker.fs_to_app.push(fs_to_app_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: d_leg_call_id,
				srcIp: peer_ip, dstIp: app_ip,
				srcPort: rtpPorts.fs_app.fs_rtp, dstPort: rtpPorts.fs_app.app_rtp,
				mos: Math.floor(fs_to_app_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 400
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_app_stats.DELTA+',"JITTER":'+fs_to_app_stats.JITTER+',"REPORT_TS":'+fs_to_app_stats.REPORT_TS+',"TL_BYTE":'+fs_to_app_stats.TL_BYTE+',"SKEW":'+fs_to_app_stats.SKEW+',"TOTAL_PK":'+fs_to_app_stats.TOTAL_PK+',"EXPECTED_PK":'+fs_to_app_stats.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_app_stats.PACKET_LOSS+',"SEQ":'+fs_to_app_stats.SEQ+',"MAX_JITTER":'+fs_to_app_stats.MAX_JITTER+',"MAX_DELTA":'+fs_to_app_stats.MAX_DELTA+',"MAX_SKEW":'+fs_to_app_stats.MAX_SKEW+',"MEAN_JITTER":'+fs_to_app_stats.MEAN_JITTER+',"MIN_MOS":'+fs_to_app_stats.MIN_MOS+', "MEAN_MOS":'+fs_to_app_stats.MEAN_MOS+', "MOS":'+fs_to_app_stats.MOS+',"RFACTOR":'+fs_to_app_stats.RFACTOR+',"MIN_RFACTOR":'+fs_to_app_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_app_stats.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.fs_app.fs_rtp+', "DST_IP":"'+app_ip+'","DST_PORT":'+rtpPorts.fs_app.app_rtp+',"SRC_MAC":"'+fs_to_app_stats.SRC_MAC+'","DST_MAC":"'+fs_to_app_stats.DST_MAC+'","OUT_ORDER":'+fs_to_app_stats.OUT_ORDER+',"SSRC_CHG":'+fs_to_app_stats.SSRC_CHG+',"CODEC_PT":'+fs_to_app_stats.CODEC_PT+', "CLOCK":'+fs_to_app_stats.CLOCK+',"CODEC_NAME":"'+fs_to_app_stats.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.fs_app.fs_rtp+'","PARTY":1,"TYPE":"PERIODIC"}'
		});

		// App → FreeSWITCH
		let app_to_fs_stats = generateRTPStats({ssrc: ssrcValues.app_to_fs}, currentTime, i);
		mosTracker.app_to_fs.push(app_to_fs_stats.MOS);
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 34,
				correlation_id: d_leg_call_id,
				srcIp: app_ip, dstIp: peer_ip,
				srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
				mos: Math.floor(app_to_fs_stats.MOS * 100),
				time_sec: Math.floor(currentTime / 1000),
				time_usec: Math.floor((currentTime % 1000) * 1000) + 500
			},
			pause: i === duration ? 10000 : 10000, // Longer pause before BYE on last report
			payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+app_to_fs_stats.DELTA+',"JITTER":'+app_to_fs_stats.JITTER+',"REPORT_TS":'+app_to_fs_stats.REPORT_TS+',"TL_BYTE":'+app_to_fs_stats.TL_BYTE+',"SKEW":'+app_to_fs_stats.SKEW+',"TOTAL_PK":'+app_to_fs_stats.TOTAL_PK+',"EXPECTED_PK":'+app_to_fs_stats.EXPECTED_PK+',"PACKET_LOSS":'+app_to_fs_stats.PACKET_LOSS+',"SEQ":'+app_to_fs_stats.SEQ+',"MAX_JITTER":'+app_to_fs_stats.MAX_JITTER+',"MAX_DELTA":'+app_to_fs_stats.MAX_DELTA+',"MAX_SKEW":'+app_to_fs_stats.MAX_SKEW+',"MEAN_JITTER":'+app_to_fs_stats.MEAN_JITTER+',"MIN_MOS":'+app_to_fs_stats.MIN_MOS+', "MEAN_MOS":'+app_to_fs_stats.MEAN_MOS+', "MOS":'+app_to_fs_stats.MOS+',"RFACTOR":'+app_to_fs_stats.RFACTOR+',"MIN_RFACTOR":'+app_to_fs_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+app_to_fs_stats.MEAN_RFACTOR+',"SRC_IP":"'+app_ip+'", "SRC_PORT":'+rtpPorts.fs_app.app_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.fs_app.fs_rtp+',"SRC_MAC":"'+app_to_fs_stats.SRC_MAC+'","DST_MAC":"'+app_to_fs_stats.DST_MAC+'","OUT_ORDER":'+app_to_fs_stats.OUT_ORDER+',"SSRC_CHG":'+app_to_fs_stats.SSRC_CHG+',"CODEC_PT":'+app_to_fs_stats.CODEC_PT+', "CLOCK":'+app_to_fs_stats.CLOCK+',"CODEC_NAME":"'+app_to_fs_stats.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+app_ip+':'+rtpPorts.fs_app.app_rtp+'","PARTY":1,"TYPE":"PERIODIC"}'
		});
	}
	return mediaReports;
}
// Calculate average MOS values for FINAL reports
function avgMOS(mosArray) {
	return (mosArray.reduce((a, b) => a + b, 0) / mosArray.length).toFixed(3);

}


function createfinalreports() {

	var mediaReports = [];
	var baseTime = Date.now();

	// Track MOS values for coherent final reports
	var mosTracker = {
		uac_to_sbc: [],
		sbc_to_uac: [],
		sbc_to_fs: [],
		fs_to_sbc: [],
		fs_to_app: [],
		app_to_fs: []
	};

	let finalTime = baseTime + 7000; // 7 seconds total call

	// === FINAL REPORTS (proto_type: 34) for all 6 streams ===

	// LEG 1 FINAL: UAC ↔ SBC
	let uac_to_sbc_final = generateRTPStats({ssrc: ssrcValues.uac_to_sbc}, finalTime, 4);
	mosTracker.uac_to_sbc.push(uac_to_sbc_final.MOS);
	//uac_to_sbc_final.MOS = parseFloat(avgMOS(mosTracker.uac_to_sbc));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: a_leg_call_id,
			srcIp: priv_ip, dstIp: priv_nat,
			srcPort: rtpPorts.uac_sbc.uac_rtp, dstPort: rtpPorts.uac_sbc.sbc_rtp,
			mos: Math.floor(uac_to_sbc_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000)
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+uac_to_sbc_final.DELTA+',"JITTER":'+uac_to_sbc_final.JITTER+',"REPORT_TS":'+uac_to_sbc_final.REPORT_TS+',"TL_BYTE":'+uac_to_sbc_final.TL_BYTE+',"SKEW":'+uac_to_sbc_final.SKEW+',"TOTAL_PK":'+uac_to_sbc_final.TOTAL_PK+',"EXPECTED_PK":'+uac_to_sbc_final.EXPECTED_PK+',"PACKET_LOSS":'+uac_to_sbc_final.PACKET_LOSS+',"SEQ":'+uac_to_sbc_final.SEQ+',"MAX_JITTER":'+uac_to_sbc_final.MAX_JITTER+',"MAX_DELTA":'+uac_to_sbc_final.MAX_DELTA+',"MAX_SKEW":'+uac_to_sbc_final.MAX_SKEW+',"MEAN_JITTER":'+uac_to_sbc_final.MEAN_JITTER+',"MIN_MOS":'+uac_to_sbc_final.MIN_MOS+',"MEAN_MOS":'+uac_to_sbc_final.MEAN_MOS+',"MOS":'+uac_to_sbc_final.MOS+',"RFACTOR":'+uac_to_sbc_final.RFACTOR+',"MIN_RFACTOR":'+uac_to_sbc_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+uac_to_sbc_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_ip+'", "SRC_PORT":'+rtpPorts.uac_sbc.uac_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"SRC_MAC":"'+uac_to_sbc_final.SRC_MAC+'","DST_MAC":"'+uac_to_sbc_final.DST_MAC+'","OUT_ORDER":'+uac_to_sbc_final.OUT_ORDER+',"SSRC_CHG":'+uac_to_sbc_final.SSRC_CHG+',"CODEC_PT":'+uac_to_sbc_final.CODEC_PT+', "CLOCK":'+uac_to_sbc_final.CLOCK+',"CODEC_NAME":"'+uac_to_sbc_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_ip+':'+rtpPorts.uac_sbc.uac_rtp+'","PARTY":0,"TYPE":"FINAL"}'
	});

	let sbc_to_uac_final = generateRTPStats({ssrc: ssrcValues.sbc_to_uac}, finalTime, 4);
	mosTracker.sbc_to_uac.push(sbc_to_uac_final.MOS);
	//sbc_to_uac_final.MOS = parseFloat(avgMOS(mosTracker.sbc_to_uac));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: a_leg_call_id,
			srcIp: priv_nat, dstIp: priv_ip,
			srcPort: rtpPorts.uac_sbc.sbc_rtp, dstPort: rtpPorts.uac_sbc.uac_rtp,
			mos: Math.floor(sbc_to_uac_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 100
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+sbc_to_uac_final.DELTA+',"JITTER":'+sbc_to_uac_final.JITTER+',"REPORT_TS":'+sbc_to_uac_final.REPORT_TS+',"TL_BYTE":'+sbc_to_uac_final.TL_BYTE+',"SKEW":'+sbc_to_uac_final.SKEW+',"TOTAL_PK":'+sbc_to_uac_final.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_uac_final.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_uac_final.PACKET_LOSS+',"SEQ":'+sbc_to_uac_final.SEQ+',"MAX_JITTER":'+sbc_to_uac_final.MAX_JITTER+',"MAX_DELTA":'+sbc_to_uac_final.MAX_DELTA+',"MAX_SKEW":'+sbc_to_uac_final.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_uac_final.MEAN_JITTER+',"MIN_MOS":'+sbc_to_uac_final.MIN_MOS+',"MEAN_MOS":'+sbc_to_uac_final.MEAN_MOS+',"MOS":'+sbc_to_uac_final.MOS+',"RFACTOR":'+sbc_to_uac_final.RFACTOR+',"MIN_RFACTOR":'+sbc_to_uac_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_uac_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.uac_sbc.sbc_rtp+', "DST_IP":"'+priv_ip+'","DST_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"SRC_MAC":"'+sbc_to_uac_final.SRC_MAC+'","DST_MAC":"'+sbc_to_uac_final.DST_MAC+'","OUT_ORDER":'+sbc_to_uac_final.OUT_ORDER+',"SSRC_CHG":'+sbc_to_uac_final.SSRC_CHG+',"CODEC_PT":'+sbc_to_uac_final.CODEC_PT+', "CLOCK":'+sbc_to_uac_final.CLOCK+',"CODEC_NAME":"'+sbc_to_uac_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.uac_sbc.sbc_rtp+'","PARTY":0,"TYPE":"FINAL"}'
	});

	// == RTCP Hangups ==

	// RTCP Stats
		
		// UAC -> SBC
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
                                captureId: 2010, capturePass: 'myHep', ip_family: 2,
	                        protocol: 17,
	                        proto_type: 34,
	                        srcIp: priv_ip,
	                        dstIp: priv_nat,
	                        srcPort: rtpPorts.uac_sbc.uac_rtp,
	                        dstPort: rtpPorts.uac_sbc.sbc_rtp,
	                        correlation_id: a_leg_call_id,
				time_sec: Math.floor(baseTime / 1000),
				time_usec: Math.floor((baseTime % 1000) * 1000) + 100
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id + '","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","SR_DELAY":0,"INTERARRIVAL_JITTER":0,"REPORT_TS":'+uac_to_sbc_stats.REPORT_TS+',"TOTAL_PK":'+uac_to_sbc_stats.TOTAL_PK+',"TOTAL_RTCP_PK":14,"CUM_PACKET_LOSS":'+uac_to_sbc_stats.PACKET_LOSS+',"PERCENTAGE_LOSS":0,"MAX_INTERARRIVAL_JITTER":'+(uac_to_sbc_stats.MAX_JITTER+150)+',"MAX_SR_DELAY":0,"MAX_PERCENTAGE_LOSS":0.391,"MEAN_PERCENTAGE_LOSS":0.055,"MEAN_INTERARRIVAL_JITTER":'+(uac_to_sbc_stats.MEAN_JITTER+150)+',"MIN_MOS":'+(uac_to_sbc_stats.MIN_MOS-1)+',"MEAN_MOS":'+(uac_to_sbc_stats.MEAN_MOS-1).toFixed(3)+',"MOS":'+(uac_to_sbc_stats.MOS-1).toFixed(3)+',"RFACTOR":'+uac_to_sbc_stats.RFACTOR+',"MIN_RFACTOR":'+uac_to_sbc_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+uac_to_sbc_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_ip+'","SRC_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"OCTET_COUNT":208160,"SSRC_CHG":'+uac_to_sbc_stats.SSRC_CHG+',"PKT_TYPE_REPORT":[200,0,0],"HIGH_EXT_SEQ":12656,"SSRC":"0xedc34144","DIR":0,"REPORT_NAME":"'+priv_ip+':'+rtpPorts.uac_sbc.uac_rtp+'","PARTY":0,"IP_QOS":0,"INFO_VLAN":0,"VIDEO":0,"REPORT_START":'+Math.floor((baseTime/1000)-10000)+',"REPORT_END":'+Math.floor((baseTime/1000)+100)+',"TYPE":"HANGUP","STYPE":"HEPAGENT-RTCP-1.1.107","SOURCE":"RTCP"}'
		});

		// SBC -> UAC
		mediaReports.push({
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
                                captureId: 2010, capturePass: 'myHep', ip_family: 2,
	                        protocol: 17,
	                        proto_type: 34,
	                        srcIp: priv_nat,
	                        dstIp: priv_ip,
	                        srcPort: rtpPorts.uac_sbc.sbc_rtp,
	                        dstPort: rtpPorts.uac_sbc.uac_rtp,
	                        correlation_id: a_leg_call_id,
				time_sec: Math.floor(baseTime / 1000),
				time_usec: Math.floor((baseTime % 1000) * 1000) + 100
			},
			pause: 200,
			payload: '{"CORRELATION_ID":"'+a_leg_call_id + '","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","SR_DELAY":0,"INTERARRIVAL_JITTER":0,"REPORT_TS":'+sbc_to_uac_stats.REPORT_TS+',"TOTAL_PK":'+sbc_to_uac_stats.TOTAL_PK+',"TOTAL_RTCP_PK":14,"CUM_PACKET_LOSS":'+sbc_to_uac_stats.PACKET_LOSS+',"PERCENTAGE_LOSS":0,"MAX_INTERARRIVAL_JITTER":'+(sbc_to_uac_stats.MAX_JITTER+150)+',"MAX_SR_DELAY":0,"MAX_PERCENTAGE_LOSS":0.391,"MEAN_PERCENTAGE_LOSS":0.055,"MEAN_INTERARRIVAL_JITTER":'+(sbc_to_uac_stats.MEAN_JITTER+150)+',"MIN_MOS":'+(sbc_to_uac_stats.MIN_MOS-1).toFixed(3)+',"MEAN_MOS":'+(sbc_to_uac_stats.MEAN_MOS-1).toFixed(3)+',"MOS":'+(sbc_to_uac_stats.MOS-1).toFixed(3)+',"RFACTOR":'+sbc_to_uac_stats.RFACTOR+',"MIN_RFACTOR":'+sbc_to_uac_stats.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_uac_stats.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'","SRC_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"DST_IP":"'+priv_ip+'","DST_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"OCTET_COUNT":208160,"SSRC_CHG":'+sbc_to_uac_stats.SSRC_CHG+',"PKT_TYPE_REPORT":[200,0,0],"HIGH_EXT_SEQ":12656,"SSRC":"0xedc34144","DIR":0,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.uac_sbc.sbc_rtp+'","PARTY":0,"IP_QOS":0,"INFO_VLAN":0,"VIDEO":0,"REPORT_START":'+Math.floor((baseTime/1000)-10000)+',"REPORT_END":'+Math.floor(baseTime/1000)+100+',"TYPE":"HANGUP","STYPE":"HEPAGENT-RTCP-1.1.107","SOURCE":"RTCP"}'
		});

	// LEG 2 FINAL: SBC ↔ FreeSWITCH
	let sbc_to_fs_final = generateRTPStats({ssrc: ssrcValues.sbc_to_fs}, finalTime, 4);
	mosTracker.sbc_to_fs.push(sbc_to_fs_final.MOS);
	//sbc_to_fs_final.MOS = parseFloat(avgMOS(mosTracker.sbc_to_fs));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: b_leg_call_id,
			srcIp: priv_nat, dstIp: peer_ip,
			srcPort: rtpPorts.sbc_fs.sbc_rtp, dstPort: rtpPorts.sbc_fs.fs_rtp,
			mos: Math.floor(sbc_to_fs_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 200
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+sbc_to_fs_final.DELTA+',"JITTER":'+sbc_to_fs_final.JITTER+',"REPORT_TS":'+sbc_to_fs_final.REPORT_TS+',"TL_BYTE":'+sbc_to_fs_final.TL_BYTE+',"SKEW":'+sbc_to_fs_final.SKEW+',"TOTAL_PK":'+sbc_to_fs_final.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_fs_final.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_fs_final.PACKET_LOSS+',"SEQ":'+sbc_to_fs_final.SEQ+',"MAX_JITTER":'+sbc_to_fs_final.MAX_JITTER+',"MAX_DELTA":'+sbc_to_fs_final.MAX_DELTA+',"MAX_SKEW":'+sbc_to_fs_final.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_fs_final.MEAN_JITTER+',"MIN_MOS":'+sbc_to_fs_final.MIN_MOS+',"MEAN_MOS":'+sbc_to_fs_final.MEAN_MOS+',"MOS":'+sbc_to_fs_final.MOS+',"RFACTOR":'+sbc_to_fs_final.RFACTOR+',"MIN_RFACTOR":'+sbc_to_fs_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_fs_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.sbc_fs.sbc_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.sbc_fs.fs_rtp+',"SRC_MAC":"'+sbc_to_fs_final.SRC_MAC+'","DST_MAC":"'+sbc_to_fs_final.DST_MAC+'","OUT_ORDER":'+sbc_to_fs_final.OUT_ORDER+',"SSRC_CHG":'+sbc_to_fs_final.SSRC_CHG+',"CODEC_PT":'+sbc_to_fs_final.CODEC_PT+', "CLOCK":'+sbc_to_fs_final.CLOCK+',"CODEC_NAME":"'+sbc_to_fs_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.sbc_fs.sbc_rtp+'","PARTY":1,"TYPE":"FINAL"}'
	});

	let fs_to_sbc_final = generateRTPStats({ssrc: ssrcValues.fs_to_sbc}, finalTime, 4);
	mosTracker.fs_to_sbc.push(fs_to_sbc_final.MOS);
	//fs_to_sbc_final.MOS = parseFloat(avgMOS(mosTracker.fs_to_sbc));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: b_leg_call_id,
			srcIp: peer_ip, dstIp: priv_nat,
			srcPort: rtpPorts.sbc_fs.fs_rtp, dstPort: rtpPorts.sbc_fs.sbc_rtp,
			mos: Math.floor(fs_to_sbc_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 300
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_sbc_final.DELTA+',"JITTER":'+fs_to_sbc_final.JITTER+',"REPORT_TS":'+fs_to_sbc_final.REPORT_TS+',"TL_BYTE":'+fs_to_sbc_final.TL_BYTE+',"SKEW":'+fs_to_sbc_final.SKEW+',"TOTAL_PK":'+fs_to_sbc_final.TOTAL_PK+',"EXPECTED_PK":'+fs_to_sbc_final.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_sbc_final.PACKET_LOSS+',"SEQ":'+fs_to_sbc_final.SEQ+',"MAX_JITTER":'+fs_to_sbc_final.MAX_JITTER+',"MAX_DELTA":'+fs_to_sbc_final.MAX_DELTA+',"MAX_SKEW":'+fs_to_sbc_final.MAX_SKEW+',"MEAN_JITTER":'+fs_to_sbc_final.MEAN_JITTER+',"MIN_MOS":'+fs_to_sbc_final.MIN_MOS+',"MEAN_MOS":'+fs_to_sbc_final.MEAN_MOS+',"MOS":'+fs_to_sbc_final.MOS+',"RFACTOR":'+fs_to_sbc_final.RFACTOR+',"MIN_RFACTOR":'+fs_to_sbc_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_sbc_final.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.sbc_fs.fs_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.sbc_fs.sbc_rtp+',"SRC_MAC":"'+fs_to_sbc_final.SRC_MAC+'","DST_MAC":"'+fs_to_sbc_final.DST_MAC+'","OUT_ORDER":'+fs_to_sbc_final.OUT_ORDER+',"SSRC_CHG":'+fs_to_sbc_final.SSRC_CHG+',"CODEC_PT":'+fs_to_sbc_final.CODEC_PT+', "CLOCK":'+fs_to_sbc_final.CLOCK+',"CODEC_NAME":"'+fs_to_sbc_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.sbc_fs.fs_rtp+'","PARTY":1,"TYPE":"FINAL"}'
	});

	// LEG 3 FINAL: FreeSWITCH ↔ App
	let fs_to_app_final = generateRTPStats({ssrc: ssrcValues.fs_to_app}, finalTime, 4);
	mosTracker.fs_to_app.push(fs_to_app_final.MOS);
	//fs_to_app_final.MOS = parseFloat(avgMOS(mosTracker.fs_to_app));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: d_leg_call_id,
			srcIp: peer_ip, dstIp: app_ip,
			srcPort: rtpPorts.fs_app.fs_rtp, dstPort: rtpPorts.fs_app.app_rtp,
			mos: Math.floor(fs_to_app_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 400
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_app_final.DELTA+',"JITTER":'+fs_to_app_final.JITTER+',"REPORT_TS":'+fs_to_app_final.REPORT_TS+',"TL_BYTE":'+fs_to_app_final.TL_BYTE+',"SKEW":'+fs_to_app_final.SKEW+',"TOTAL_PK":'+fs_to_app_final.TOTAL_PK+',"EXPECTED_PK":'+fs_to_app_final.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_app_final.PACKET_LOSS+',"SEQ":'+fs_to_app_final.SEQ+',"MAX_JITTER":'+fs_to_app_final.MAX_JITTER+',"MAX_DELTA":'+fs_to_app_final.MAX_DELTA+',"MAX_SKEW":'+fs_to_app_final.MAX_SKEW+',"MEAN_JITTER":'+fs_to_app_final.MEAN_JITTER+',"MIN_MOS":'+fs_to_app_final.MIN_MOS+',"MEAN_MOS":'+fs_to_app_final.MEAN_MOS+',"MOS":'+fs_to_app_final.MOS+',"RFACTOR":'+fs_to_app_final.RFACTOR+',"MIN_RFACTOR":'+fs_to_app_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_app_final.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.fs_app.fs_rtp+', "DST_IP":"'+app_ip+'","DST_PORT":'+rtpPorts.fs_app.app_rtp+',"SRC_MAC":"'+fs_to_app_final.SRC_MAC+'","DST_MAC":"'+fs_to_app_final.DST_MAC+'","OUT_ORDER":'+fs_to_app_final.OUT_ORDER+',"SSRC_CHG":'+fs_to_app_final.SSRC_CHG+',"CODEC_PT":'+fs_to_app_final.CODEC_PT+', "CLOCK":'+fs_to_app_final.CLOCK+',"CODEC_NAME":"'+fs_to_app_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.fs_app.fs_rtp+'","PARTY":1,"TYPE":"FINAL"}'
	});

	let app_to_fs_final = generateRTPStats({ssrc: ssrcValues.app_to_fs}, finalTime, 4);
	mosTracker.app_to_fs.push(app_to_fs_final.MOS);
	//app_to_fs_final.MOS = parseFloat(avgMOS(mosTracker.app_to_fs));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: d_leg_call_id,
			srcIp: app_ip, dstIp: peer_ip,
			srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
			mos: Math.floor(app_to_fs_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 500
		},
		pause: 1000,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+app_to_fs_final.DELTA+',"JITTER":'+app_to_fs_final.JITTER+',"REPORT_TS":'+app_to_fs_final.REPORT_TS+',"TL_BYTE":'+app_to_fs_final.TL_BYTE+',"SKEW":'+app_to_fs_final.SKEW+',"TOTAL_PK":'+app_to_fs_final.TOTAL_PK+',"EXPECTED_PK":'+app_to_fs_final.EXPECTED_PK+',"PACKET_LOSS":'+app_to_fs_final.PACKET_LOSS+',"SEQ":'+app_to_fs_final.SEQ+',"MAX_JITTER":'+app_to_fs_final.MAX_JITTER+',"MAX_DELTA":'+app_to_fs_final.MAX_DELTA+',"MAX_SKEW":'+app_to_fs_final.MAX_SKEW+',"MEAN_JITTER":'+app_to_fs_final.MEAN_JITTER+',"MIN_MOS":'+app_to_fs_final.MIN_MOS+',"MEAN_MOS":'+app_to_fs_final.MEAN_MOS+',"MOS":'+app_to_fs_final.MOS+',"RFACTOR":'+app_to_fs_final.RFACTOR+',"MIN_RFACTOR":'+app_to_fs_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+app_to_fs_final.MEAN_RFACTOR+',"SRC_IP":"'+app_ip+'", "SRC_PORT":'+rtpPorts.fs_app.app_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.fs_app.fs_rtp+',"SRC_MAC":"'+app_to_fs_final.SRC_MAC+'","DST_MAC":"'+app_to_fs_final.DST_MAC+'","OUT_ORDER":'+app_to_fs_final.OUT_ORDER+',"SSRC_CHG":'+app_to_fs_final.SSRC_CHG+',"CODEC_PT":'+app_to_fs_final.CODEC_PT+', "CLOCK":'+app_to_fs_final.CLOCK+',"CODEC_NAME":"'+app_to_fs_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+app_ip+':'+rtpPorts.fs_app.app_rtp+'","PARTY":1,"TYPE":"FINAL"}'
	});

	return mediaReports;
}

// generate Hangup-reports
function createhangupreports() {

	var mediaReports = [];
	var baseTime = Date.now();

	// Track MOS values for coherent final reports
	var mosTracker = {
		uac_to_sbc: [],
		sbc_to_uac: [],
		sbc_to_fs: [],
		fs_to_sbc: [],
		fs_to_app: [],
		app_to_fs: []
	};

	let finalTime = baseTime + 7000; // 7 seconds total call

	// === FINAL REPORTS (proto_type: 34) for all 6 streams ===

	// LEG 1 FINAL: UAC ↔ SBC
	let uac_to_sbc_final = generateRTPStats({ssrc: ssrcValues.uac_to_sbc}, finalTime, 4);
	mosTracker.uac_to_sbc.push(uac_to_sbc_final.MOS);
	//uac_to_sbc_final.MOS = parseFloat(avgMOS(mosTracker.uac_to_sbc));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: a_leg_call_id,
			srcIp: priv_ip, dstIp: priv_nat,
			srcPort: rtpPorts.uac_sbc.uac_rtp, dstPort: rtpPorts.uac_sbc.sbc_rtp,
			mos: Math.floor(uac_to_sbc_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000)
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+uac_to_sbc_final.DELTA+',"JITTER":'+uac_to_sbc_final.JITTER+',"REPORT_TS":'+uac_to_sbc_final.REPORT_TS+',"TL_BYTE":'+uac_to_sbc_final.TL_BYTE+',"SKEW":'+uac_to_sbc_final.SKEW+',"TOTAL_PK":'+uac_to_sbc_final.TOTAL_PK+',"EXPECTED_PK":'+uac_to_sbc_final.EXPECTED_PK+',"PACKET_LOSS":'+uac_to_sbc_final.PACKET_LOSS+',"SEQ":'+uac_to_sbc_final.SEQ+',"MAX_JITTER":'+uac_to_sbc_final.MAX_JITTER+',"MAX_DELTA":'+uac_to_sbc_final.MAX_DELTA+',"MAX_SKEW":'+uac_to_sbc_final.MAX_SKEW+',"MEAN_JITTER":'+uac_to_sbc_final.MEAN_JITTER+',"MIN_MOS":'+uac_to_sbc_final.MIN_MOS+', "MEAN_MOS":'+uac_to_sbc_final.MEAN_MOS+', "MOS":'+uac_to_sbc_final.MOS+',"RFACTOR":'+uac_to_sbc_final.RFACTOR+',"MIN_RFACTOR":'+uac_to_sbc_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+uac_to_sbc_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_ip+'", "SRC_PORT":'+rtpPorts.uac_sbc.uac_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.uac_sbc.sbc_rtp+',"SRC_MAC":"'+uac_to_sbc_final.SRC_MAC+'","DST_MAC":"'+uac_to_sbc_final.DST_MAC+'","OUT_ORDER":'+uac_to_sbc_final.OUT_ORDER+',"SSRC_CHG":'+uac_to_sbc_final.SSRC_CHG+',"CODEC_PT":'+uac_to_sbc_final.CODEC_PT+', "CLOCK":'+uac_to_sbc_final.CLOCK+',"CODEC_NAME":"'+uac_to_sbc_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_ip+':'+rtpPorts.uac_sbc.uac_rtp+'","PARTY":0,"TYPE":"HANGUP"}'
	});

	let sbc_to_uac_final = generateRTPStats({ssrc: ssrcValues.sbc_to_uac}, finalTime, 4);
	mosTracker.sbc_to_uac.push(sbc_to_uac_final.MOS);
	//sbc_to_uac_final.MOS = parseFloat(avgMOS(mosTracker.sbc_to_uac));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: a_leg_call_id,
			srcIp: priv_nat, dstIp: priv_ip,
			srcPort: rtpPorts.uac_sbc.sbc_rtp, dstPort: rtpPorts.uac_sbc.uac_rtp,
			mos: Math.floor(sbc_to_uac_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 100
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+a_leg_call_id+'","RTP_SIP_CALL_ID":"'+a_leg_call_id+'","DELTA":'+sbc_to_uac_final.DELTA+',"JITTER":'+sbc_to_uac_final.JITTER+',"REPORT_TS":'+sbc_to_uac_final.REPORT_TS+',"TL_BYTE":'+sbc_to_uac_final.TL_BYTE+',"SKEW":'+sbc_to_uac_final.SKEW+',"TOTAL_PK":'+sbc_to_uac_final.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_uac_final.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_uac_final.PACKET_LOSS+',"SEQ":'+sbc_to_uac_final.SEQ+',"MAX_JITTER":'+sbc_to_uac_final.MAX_JITTER+',"MAX_DELTA":'+sbc_to_uac_final.MAX_DELTA+',"MAX_SKEW":'+sbc_to_uac_final.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_uac_final.MEAN_JITTER+',"MIN_MOS":'+sbc_to_uac_final.MIN_MOS+', "MEAN_MOS":'+sbc_to_uac_final.MEAN_MOS+', "MOS":'+sbc_to_uac_final.MOS+',"RFACTOR":'+sbc_to_uac_final.RFACTOR+',"MIN_RFACTOR":'+sbc_to_uac_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_uac_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.uac_sbc.sbc_rtp+', "DST_IP":"'+priv_ip+'","DST_PORT":'+rtpPorts.uac_sbc.uac_rtp+',"SRC_MAC":"'+sbc_to_uac_final.SRC_MAC+'","DST_MAC":"'+sbc_to_uac_final.DST_MAC+'","OUT_ORDER":'+sbc_to_uac_final.OUT_ORDER+',"SSRC_CHG":'+sbc_to_uac_final.SSRC_CHG+',"CODEC_PT":'+sbc_to_uac_final.CODEC_PT+', "CLOCK":'+sbc_to_uac_final.CLOCK+',"CODEC_NAME":"'+sbc_to_uac_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.uac_sbc.sbc_rtp+'","PARTY":0,"TYPE":"HANGUP"}'
	});

	// LEG 2 FINAL: SBC ↔ FreeSWITCH
	let sbc_to_fs_final = generateRTPStats({ssrc: ssrcValues.sbc_to_fs}, finalTime, 4);
	mosTracker.sbc_to_fs.push(sbc_to_fs_final.MOS);
	//sbc_to_fs_final.MOS = parseFloat(avgMOS(mosTracker.sbc_to_fs));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: b_leg_call_id,
			srcIp: priv_nat, dstIp: peer_ip,
			srcPort: rtpPorts.sbc_fs.sbc_rtp, dstPort: rtpPorts.sbc_fs.fs_rtp,
			mos: Math.floor(sbc_to_fs_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 200
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+sbc_to_fs_final.DELTA+',"JITTER":'+sbc_to_fs_final.JITTER+',"REPORT_TS":'+sbc_to_fs_final.REPORT_TS+',"TL_BYTE":'+sbc_to_fs_final.TL_BYTE+',"SKEW":'+sbc_to_fs_final.SKEW+',"TOTAL_PK":'+sbc_to_fs_final.TOTAL_PK+',"EXPECTED_PK":'+sbc_to_fs_final.EXPECTED_PK+',"PACKET_LOSS":'+sbc_to_fs_final.PACKET_LOSS+',"SEQ":'+sbc_to_fs_final.SEQ+',"MAX_JITTER":'+sbc_to_fs_final.MAX_JITTER+',"MAX_DELTA":'+sbc_to_fs_final.MAX_DELTA+',"MAX_SKEW":'+sbc_to_fs_final.MAX_SKEW+',"MEAN_JITTER":'+sbc_to_fs_final.MEAN_JITTER+',"MIN_MOS":'+sbc_to_fs_final.MIN_MOS+', "MEAN_MOS":'+sbc_to_fs_final.MEAN_MOS+', "MOS":'+sbc_to_fs_final.MOS+',"RFACTOR":'+sbc_to_fs_final.RFACTOR+',"MIN_RFACTOR":'+sbc_to_fs_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+sbc_to_fs_final.MEAN_RFACTOR+',"SRC_IP":"'+priv_nat+'", "SRC_PORT":'+rtpPorts.sbc_fs.sbc_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.sbc_fs.fs_rtp+',"SRC_MAC":"'+sbc_to_fs_final.SRC_MAC+'","DST_MAC":"'+sbc_to_fs_final.DST_MAC+'","OUT_ORDER":'+sbc_to_fs_final.OUT_ORDER+',"SSRC_CHG":'+sbc_to_fs_final.SSRC_CHG+',"CODEC_PT":'+sbc_to_fs_final.CODEC_PT+', "CLOCK":'+sbc_to_fs_final.CLOCK+',"CODEC_NAME":"'+sbc_to_fs_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+priv_nat+':'+rtpPorts.sbc_fs.sbc_rtp+'","PARTY":1,"TYPE":"HANGUP"}'
	});

	let fs_to_sbc_final = generateRTPStats({ssrc: ssrcValues.fs_to_sbc}, finalTime, 4);
	mosTracker.fs_to_sbc.push(fs_to_sbc_final.MOS);
	//fs_to_sbc_final.MOS = parseFloat(avgMOS(mosTracker.fs_to_sbc));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: b_leg_call_id,
			srcIp: peer_ip, dstIp: priv_nat,
			srcPort: rtpPorts.sbc_fs.fs_rtp, dstPort: rtpPorts.sbc_fs.sbc_rtp,
			mos: Math.floor(fs_to_sbc_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 300
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_sbc_final.DELTA+',"JITTER":'+fs_to_sbc_final.JITTER+',"REPORT_TS":'+fs_to_sbc_final.REPORT_TS+',"TL_BYTE":'+fs_to_sbc_final.TL_BYTE+',"SKEW":'+fs_to_sbc_final.SKEW+',"TOTAL_PK":'+fs_to_sbc_final.TOTAL_PK+',"EXPECTED_PK":'+fs_to_sbc_final.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_sbc_final.PACKET_LOSS+',"SEQ":'+fs_to_sbc_final.SEQ+',"MAX_JITTER":'+fs_to_sbc_final.MAX_JITTER+',"MAX_DELTA":'+fs_to_sbc_final.MAX_DELTA+',"MAX_SKEW":'+fs_to_sbc_final.MAX_SKEW+',"MEAN_JITTER":'+fs_to_sbc_final.MEAN_JITTER+',"MIN_MOS":'+fs_to_sbc_final.MIN_MOS+', "MEAN_MOS":'+fs_to_sbc_final.MEAN_MOS+', "MOS":'+fs_to_sbc_final.MOS+',"RFACTOR":'+fs_to_sbc_final.RFACTOR+',"MIN_RFACTOR":'+fs_to_sbc_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_sbc_final.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.sbc_fs.fs_rtp+', "DST_IP":"'+priv_nat+'","DST_PORT":'+rtpPorts.sbc_fs.sbc_rtp+',"SRC_MAC":"'+fs_to_sbc_final.SRC_MAC+'","DST_MAC":"'+fs_to_sbc_final.DST_MAC+'","OUT_ORDER":'+fs_to_sbc_final.OUT_ORDER+',"SSRC_CHG":'+fs_to_sbc_final.SSRC_CHG+',"CODEC_PT":'+fs_to_sbc_final.CODEC_PT+', "CLOCK":'+fs_to_sbc_final.CLOCK+',"CODEC_NAME":"'+fs_to_sbc_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.sbc_fs.fs_rtp+'","PARTY":1,"TYPE":"HANGUP"}'
	});

	// LEG 3 FINAL: FreeSWITCH ↔ App
	let fs_to_app_final = generateRTPStats({ssrc: ssrcValues.fs_to_app}, finalTime, 4);
	mosTracker.fs_to_app.push(fs_to_app_final.MOS);
	//fs_to_app_final.MOS = parseFloat(avgMOS(mosTracker.fs_to_app));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: d_leg_call_id,
			srcIp: peer_ip, dstIp: app_ip,
			srcPort: rtpPorts.fs_app.fs_rtp, dstPort: rtpPorts.fs_app.app_rtp,
			mos: Math.floor(fs_to_app_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 400
		},
		pause: 100,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+fs_to_app_final.DELTA+',"JITTER":'+fs_to_app_final.JITTER+',"REPORT_TS":'+fs_to_app_final.REPORT_TS+',"TL_BYTE":'+fs_to_app_final.TL_BYTE+',"SKEW":'+fs_to_app_final.SKEW+',"TOTAL_PK":'+fs_to_app_final.TOTAL_PK+',"EXPECTED_PK":'+fs_to_app_final.EXPECTED_PK+',"PACKET_LOSS":'+fs_to_app_final.PACKET_LOSS+',"SEQ":'+fs_to_app_final.SEQ+',"MAX_JITTER":'+fs_to_app_final.MAX_JITTER+',"MAX_DELTA":'+fs_to_app_final.MAX_DELTA+',"MAX_SKEW":'+fs_to_app_final.MAX_SKEW+',"MEAN_JITTER":'+fs_to_app_final.MEAN_JITTER+',"MIN_MOS":'+fs_to_app_final.MIN_MOS+', "MEAN_MOS":'+fs_to_app_final.MEAN_MOS+', "MOS":'+fs_to_app_final.MOS+',"RFACTOR":'+fs_to_app_final.RFACTOR+',"MIN_RFACTOR":'+fs_to_app_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+fs_to_app_final.MEAN_RFACTOR+',"SRC_IP":"'+peer_ip+'", "SRC_PORT":'+rtpPorts.fs_app.fs_rtp+', "DST_IP":"'+app_ip+'","DST_PORT":'+rtpPorts.fs_app.app_rtp+',"SRC_MAC":"'+fs_to_app_final.SRC_MAC+'","DST_MAC":"'+fs_to_app_final.DST_MAC+'","OUT_ORDER":'+fs_to_app_final.OUT_ORDER+',"SSRC_CHG":'+fs_to_app_final.SSRC_CHG+',"CODEC_PT":'+fs_to_app_final.CODEC_PT+', "CLOCK":'+fs_to_app_final.CLOCK+',"CODEC_NAME":"'+fs_to_app_final.CODEC_NAME+'","DIR":0,"REPORT_NAME":"'+peer_ip+':'+rtpPorts.fs_app.fs_rtp+'","PARTY":1,"TYPE":"HANGUP"}'
	});

	let app_to_fs_final = generateRTPStats({ssrc: ssrcValues.app_to_fs}, finalTime, 4);
	mosTracker.app_to_fs.push(app_to_fs_final.MOS);
	//app_to_fs_final.MOS = parseFloat(avgMOS(mosTracker.app_to_fs));
	mediaReports.push({
		rcinfo: {
			type: 'HEP', version: 3, payload_type: 'JSON',
			captureId: 2010, capturePass: 'myHep', ip_family: 2,
			protocol: 17, proto_type: 34,
			correlation_id: d_leg_call_id,
			srcIp: app_ip, dstIp: peer_ip,
			srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
			mos: Math.floor(app_to_fs_final.MOS * 100),
			time_sec: Math.floor(finalTime / 1000),
			time_usec: Math.floor((finalTime % 1000) * 1000) + 500
		},
		pause: 200,
		payload: '{"CORRELATION_ID":"'+b_leg_call_id+'","RTP_SIP_CALL_ID":"'+b_leg_call_id+'","DELTA":'+app_to_fs_final.DELTA+',"JITTER":'+app_to_fs_final.JITTER+',"REPORT_TS":'+app_to_fs_final.REPORT_TS+',"TL_BYTE":'+app_to_fs_final.TL_BYTE+',"SKEW":'+app_to_fs_final.SKEW+',"TOTAL_PK":'+app_to_fs_final.TOTAL_PK+',"EXPECTED_PK":'+app_to_fs_final.EXPECTED_PK+',"PACKET_LOSS":'+app_to_fs_final.PACKET_LOSS+',"SEQ":'+app_to_fs_final.SEQ+',"MAX_JITTER":'+app_to_fs_final.MAX_JITTER+',"MAX_DELTA":'+app_to_fs_final.MAX_DELTA+',"MAX_SKEW":'+app_to_fs_final.MAX_SKEW+',"MEAN_JITTER":'+app_to_fs_final.MEAN_JITTER+',"MIN_MOS":'+app_to_fs_final.MIN_MOS+', "MEAN_MOS":'+app_to_fs_final.MEAN_MOS+', "MOS":'+app_to_fs_final.MOS+',"RFACTOR":'+app_to_fs_final.RFACTOR+',"MIN_RFACTOR":'+app_to_fs_final.MIN_RFACTOR+',"MEAN_RFACTOR":'+app_to_fs_final.MEAN_RFACTOR+',"SRC_IP":"'+app_ip+'", "SRC_PORT":'+rtpPorts.fs_app.app_rtp+', "DST_IP":"'+peer_ip+'","DST_PORT":'+rtpPorts.fs_app.fs_rtp+',"SRC_MAC":"'+app_to_fs_final.SRC_MAC+'","DST_MAC":"'+app_to_fs_final.DST_MAC+'","OUT_ORDER":'+app_to_fs_final.OUT_ORDER+',"SSRC_CHG":'+app_to_fs_final.SSRC_CHG+',"CODEC_PT":'+app_to_fs_final.CODEC_PT+', "CLOCK":'+app_to_fs_final.CLOCK+',"CODEC_NAME":"'+app_to_fs_final.CODEC_NAME+'","DIR":1,"REPORT_NAME":"'+app_ip+':'+rtpPorts.fs_app.app_rtp+'","PARTY":1,"TYPE":"HANGUP"}'
	});

	return mediaReports;
}
// Auto-generated SIP flow with full forward and reverse paths
var config = {
	NAME: 'Full SIP Call Flow with RTP Media',
	HEP_SERVER: '127.0.0.1',
	HEP_PORT: 9063,
	HEP_ID: 2010,
	HEP_AUTH: 'myHep',
	MESSAGES: [
		// === INVITE SEQUENCE ===
		// 1. Caller → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
			'Contact: <sip:hepgenjs@192.168.1.10:5060>\r\n' +
			'User-Agent: PolycomVVX-VVX_300-UA/4.1.6.4835\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 200\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=hepgenjs 8000 8000 IN IP4 192.168.1.10\r\n' +
			's=SIP Call\r\n' +
			'c=IN IP4 192.168.1.10\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.uac_sbc.uac_rtp + ' RTP/AVP 9 0 8 101\r\n' +
			'a=sendrecv\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:8 PCMA/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'\r\n'
		},

		// 2. SBC → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
			'Contact: <sip:sbc@192.168.1.11:5060>\r\n' +
			'User-Agent: sbc\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 200\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=sbc 8000 8000 IN IP4 192.168.1.11\r\n' +
			's=SIP Call\r\n' +
			'c=IN IP4 192.168.1.11\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.sbc_fs.sbc_rtp + ' RTP/AVP 9 0 8 101\r\n' +
			'a=sendrecv\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:8 PCMA/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'\r\n'
		},

		// 3. Kamailio → FreeSWITCH
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:kam@192.168.1.12:5060>\r\n' +
			'User-Agent: sbc\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 200\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=kam 8000 8000 IN IP4 192.168.1.11\r\n' +
			's=SIP Call\r\n' +
			'c=IN IP4 192.168.1.11\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.sbc_fs.sbc_rtp + ' RTP/AVP 9 0 8 101\r\n' +
			'a=sendrecv\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:8 PCMA/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'\r\n'
		},

		// 4. FreeSWITCH → App
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 100,
			payload:
			'INVITE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:fs@192.168.1.13:5060>\r\n' +
			'User-Agent: freeswitch\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 200\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=fs 8000 8000 IN IP4 192.168.1.13\r\n' +
			's=SIP Call\r\n' +
			'c=IN IP4 192.168.1.13\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.fs_app.fs_rtp + ' RTP/AVP 9 0 8 101\r\n' +
			'a=sendrecv\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:8 PCMA/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'\r\n'
		},

		// === 100 TRYING RESPONSES ===
		// 100 Trying: App → FS
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 100 Trying: FS → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 200,
			payload:
			'SIP/2.0 100 Trying\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 100 Trying: Kamailio → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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

		// === 180 RINGING RESPONSES ===
		// 180 Ringing: App → FS
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 180 Ringing: FS → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 300,
			payload:
			'SIP/2.0 180 Ringing\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:1234@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 180 Ringing: Kamailio → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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

		// === 200 OK RESPONSES (WITH SDP) ===
		// 1. App → FreeSWITCH
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:9876@192.168.1.14:5070>\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 180\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=app 9000 9000 IN IP4 192.168.1.14\r\n' +
			's=session\r\n' +
			'c=IN IP4 192.168.1.14\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.fs_app.app_rtp + ' RTP/AVP 9 0 101\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'a=sendrecv\r\n' +
			'\r\n'
		},

		// 2. FreeSWITCH → Kamailio
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:9876@192.168.1.13:5060>\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 180\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=fs 9000 9000 IN IP4 192.168.1.13\r\n' +
			's=session\r\n' +
			'c=IN IP4 192.168.1.13\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.sbc_fs.fs_rtp + ' RTP/AVP 9 0 101\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'a=sendrecv\r\n' +
			'\r\n'
		},

		// 3. Kamailio → SBC
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.11:5060;branch=z9hG4bK-sbc-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=sbc\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + b_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:9876@192.168.1.13:5060>\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 180\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=fs 9000 9000 IN IP4 192.168.1.13\r\n' +
			's=session\r\n' +
			'c=IN IP4 192.168.1.13\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.sbc_fs.fs_rtp + ' RTP/AVP 9 0 101\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'a=sendrecv\r\n' +
			'\r\n'
		},

		// 4. SBC → Caller
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.10', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-inv;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 INVITE\r\n' +
			'Contact: <sip:9876@192.168.1.11:5060>\r\n' +
			'Content-Type: application/sdp\r\n' +
			'Content-Length: 180\r\n' +
			'\r\n' +
			'v=0\r\n' +
			'o=sbc 9000 9000 IN IP4 192.168.1.11\r\n' +
			's=session\r\n' +
			'c=IN IP4 192.168.1.11\r\n' +
			't=0 0\r\n' +
			'm=audio ' + rtpPorts.uac_sbc.sbc_rtp + ' RTP/AVP 9 0 101\r\n' +
			'a=rtpmap:9 G722/8000\r\n' +
			'a=rtpmap:0 PCMU/8000\r\n' +
			'a=rtpmap:101 telephone-event/8000\r\n' +
			'a=fmtp:101 0-15\r\n' +
			'a=sendrecv\r\n' +
			'\r\n'
		},

		// === ACK SEQUENCE ===
		// ACK from Caller → App through all hops
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: a_leg_call_id,
				srcIp: '192.168.1.10', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-caller-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=caller\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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

		// === Ribbon Log ===

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2050, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 100, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.11', dstIp: '192.168.1.11', srcPort: 5060, dstPort: 5060
			},
			pause: 250,
			payload:
			'Acct-Status-Type = Start\r\n' +
			'Acct-Authentic = 0\r\n' +
			'NET-Session-Ingress-CallId = "0"\r\n' +
			'NET-Session-Egress-CallId = "' + b_leg_call_id + '"\r\n' +
			'NET-Session-Generic-Id = "2"\r\n' +
			'Acct-Multi-Session-Id = "' + Date.now() + '"\r\n' +
			'NET-Ingress-Signaling-Group = "1"\r\n' +
			'NET-Egress-Signaling-Group = "0"\r\n' +
			'NET-Ingress-Channel-Number = 1\r\n' +
			'NET-Egress-Channel-Number = 0\r\n' +
			'NET-Call-Origin = "1"\r\n' +
			'NET-Calling-Number = "sip:hepgenjs@sipcapture.org"\r\n' +
			'NET-Called-Number = "9876"\r\n' +
			'NET-Calling-Name = "PolycomVVX-VVX_300-UA/4.1.6.4835"\r\n' +
			'NET-Ingress-Channel-Id = "0:1:1"\r\n' + 
			'NET-Setup-Time = "' + Date.now() + '"\r\n' +
			'Acct-Session-Id = "0"\r\n' +
			'NET-Firmware-Version = "2.0.0v85"\r\n' +
			'NET-Local-Time-Zone = "CEST"\r\n' +
			'NET-Gw-Id = "efb8efa8cdfedc3ba0bb7b"\r\n' +
			'NET-Time-And-Day = "' + Date.now() + '"\r\n' +
			'NAS-Port = 1813\r\n' +
			'Acct-Delay-Time = 0\r\n' +
			'NAS-IP-Address = 134.56.72.218\r\n' +
			'Acct-Unique-Session-Id = "4d1f78f67a5c582e"\r\n'+
			'Timestamp = ' + Date.now() + '\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 400,
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 500, 
			payload:
			'ACK sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-ack;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 1 ACK\r\n' +
			'Content-Length: 0\r\n\r\n'
		},
		// DTMF to start off RTP
		{
			rcinfo: {
                                type: 'HEP', version: 3, payload_type: 'JSON',
                                captureId: 2010, capturePass: 'myHep', ip_family: 2,
                                protocol: 17, proto_type: 100,
                                correlation_id: a_leg_call_id,
                                srcIp: priv_ip, dstIp: priv_nat,
                                srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
                                mos: 436,
				time_sec: Math.floor(Date.now() / 1000) + 6,
                                time_usec: Math.floor((Date.now() % 1000) * 1000)
                  	},
                  	pause: 1000, // Longer pause before media starts
                  	payload: '{"CORRELATION_ID":"' + a_leg_call_id + '",' + '"REPORT_TS":' + (Math.floor(Date.now() / 1000) + 6) + ',' + '"DTMF":"ts:' + (Math.floor(Date.now() / 1000) + 6) + ',tsu:843750,e:1,v:15,d:160,c:1"}'
                },

		// === MEDIA PHASE: Insert RTP reports here ===
		...createMediaReports(),

		// === CALL TEARDOWN PHASE ===
		// BYE from Caller → App
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.12', dstIp: '192.168.1.13', srcPort: 5060, dstPort: 5060
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=kam\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.14', srcPort: 5060, dstPort: 5070
			},
			pause: 500,
			payload:
			'BYE sip:9876@sipcapture.org SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		// 200 OK (BYE) from App → Caller
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.14', dstIp: '192.168.1.13', srcPort: 5070, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.13:5060;branch=z9hG4bK-fs-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + d_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 1, correlation_id: b_leg_call_id,
				srcIp: '192.168.1.13', dstIp: '192.168.1.12', srcPort: 5060, dstPort: 5060
			},
			pause: 600,
			payload:
			'SIP/2.0 200 OK\r\n' +
			'Via: SIP/2.0/UDP 192.168.1.12:5060;branch=z9hG4bK-kam-bye;rport\r\n' +
			'From: <sip:hepgenjs@sipcapture.org>;tag=fs\r\n' +
			'To: <sip:9876@sipcapture.org>;tag=apptag\r\n' +
			'Call-ID: ' + c_leg_call_id + '\r\n' +
			'x-cid: ' + a_leg_call_id + '\r\n' +
			'CSeq: 2 BYE\r\n' +
			'Content-Length: 0\r\n\r\n'
		},

		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 1,
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
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
		},
		...createhangupreports(),
		...createfinalreports(),
		// === RTP SUMMARY REPORTS (proto_type: 35) ===
		// A-leg Summary Report - Outbound (DIR=0)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: a_leg_call_id,
				srcIp: priv_ip, dstIp: priv_nat,
				srcPort: rtpPorts.uac_sbc.uac_rtp, dstPort: rtpPorts.uac_sbc.sbc_rtp,
				mos: 434,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 165000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: a_leg_call_id,
				RTP_SIP_CALL_ID: a_leg_call_id,
				MOS: 4.34,
				RFACTOR: 89.2,
				DIR: 0,
				REPORT_NAME: priv_ip,
				PARTY: 0,
				TYPE: "FINAL"
			})
		},

		// A-leg Summary Report - Inbound (DIR=1)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: a_leg_call_id,
				srcIp: priv_nat, dstIp: priv_ip,
				srcPort: rtpPorts.uac_sbc.sbc_rtp, dstPort: rtpPorts.uac_sbc.uac_rtp,
				mos: 431,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 215000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: a_leg_call_id,
				RTP_SIP_CALL_ID: a_leg_call_id,
				MOS: 4.31,
				RFACTOR: 87.5,
				DIR: 1,
				REPORT_NAME: priv_nat,
				PARTY: 1,
				TYPE: "FINAL"
			})
		},

		// B-leg1 Summary Report - Outbound (DIR=0)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: b_leg_call_id,
				srcIp: priv_nat, dstIp: peer_ip,
				srcPort: rtpPorts.sbc_fs.sbc_rtp, dstPort: rtpPorts.sbc_fs.fs_rtp,
				mos: 433,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 265000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: b_leg_call_id,
				RTP_SIP_CALL_ID: b_leg_call_id,
				MOS: 4.33,
				RFACTOR: 88.8,
				DIR: 0,
				REPORT_NAME: priv_nat,
				PARTY: 1,
				TYPE: "FINAL"
			})
		},

		// B-leg1 Summary Report - Inbound (DIR=1)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: b_leg_call_id,
				srcIp: peer_ip, dstIp: priv_nat,
				srcPort: rtpPorts.sbc_fs.fs_rtp, dstPort: rtpPorts.sbc_fs.sbc_rtp,
				mos: 429,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 315000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: b_leg_call_id,
				RTP_SIP_CALL_ID: b_leg_call_id,
				MOS: 4.29,
				RFACTOR: 86.2,
				DIR: 1,
				REPORT_NAME: peer_ip,
				PARTY: 1,
				TYPE: "FINAL"
			})
		},

		// B-leg2 Summary Report - Outbound (DIR=0)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: b_leg_call_id,
				srcIp: peer_ip, dstIp: app_ip,
				srcPort: rtpPorts.fs_app.fs_rtp, dstPort: rtpPorts.fs_app.app_rtp,
				mos: 436,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 365000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: b_leg_call_id,
				RTP_SIP_CALL_ID: b_leg_call_id,
				MOS: 4.36,
				RFACTOR: 90.1,
				DIR: 0,
				REPORT_NAME: peer_ip,
				PARTY: 1,
				TYPE: "FINAL"
			})
		},

		// B-leg2 Summary Report - Inbound (DIR=1)
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 35,
				correlation_id: b_leg_call_id,
				srcIp: app_ip, dstIp: peer_ip,
				srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
				mos: 438,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 415000
			},
			pause: 1000,
			payload: JSON.stringify({
				CORRELATION_ID: b_leg_call_id,
				RTP_SIP_CALL_ID: b_leg_call_id,
				MOS: 4.38,
				RFACTOR: 91.5,
				DIR: 1,
				REPORT_NAME: app_ip,
				PARTY: 1,
				TYPE: "FINAL"
			})
		},
		// Session Log
		{
			rcinfo: {
				type: 'HEP', version: 3, payload_type: 'JSON',
				captureId: 2010, capturePass: 'myHep', ip_family: 2,
				protocol: 17, proto_type: 100,
				correlation_id: b_leg_call_id,
				srcIp: app_ip, dstIp: pub_ip,
				srcPort: rtpPorts.fs_app.app_rtp, dstPort: rtpPorts.fs_app.fs_rtp,
				mos: 436,
				time_sec: Math.floor(Date.now() / 1000) + 10,
				time_usec: 465000
			},
			pause: 100,
			payload: 'CDR: TS='+new Date().toISOString()+' FROM='+caller+' TO='+callee+' COST=0.00'+rand(21,99)+' CALLID='+b_leg_call_id
		}
	]
};

module.exports = config;
