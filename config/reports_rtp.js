// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var rand = function(maximum,minimum){
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

var randomByte = function() {
  return Math.round(Math.random()*254);
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
var priv_nat =randomIp();
var pub_ip = randomIp();
var peer_ip='55.66.77.'+rand(80,88);
var localhost = '127.0.0.1';

var useragent = 'HEPGEN.JS@sipcapture.org';

console.log("CALLID: "+call_id);

// tag

var config = {
        NAME: 'SIP B2BUA Session + Logs',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: 2001,
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [

{
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 34,
                          srcIp: pub_ip,
                          dstIp: peer_ip,
                          srcPort: 0,
                          dstPort: 0,
                          mos: 403,
                          correlation_id: call_id
                  },
    		  pause: 400,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":19.983,"JITTER":0.017,"REPORT_TS":'+new Date().getTime()/1000+',"TL_BYTE":0,"SKEW":0.000,"TOTAL_PK":1512,"EXPECTED_PK":1512,"PACKET_LOSS":0,"SEQ":0,"MAX_JITTER":0.010,"MAX_DELTA":20.024,"MAX_SKEW":0.172,"MEAN_JITTER":0.005,"MIN_MOS":4.032, "MEAN_MOS":4.032, "MOS":4.032,"RFACTOR":80.200,"MIN_RFACTOR":80.200,"MEAN_RFACTOR":80.200,"SRC_IP":"'+pub_ip+'", "SRC_PORT":26872, "DST_IP":"'+peer_ip+'","DST_PORT":51354,"SRC_MAC":"00-30-48-7E-5D-C6","DST_MAC":"00-12-80-D7-38-5E","OUT_ORDER":0,"SSRC_CHG":0,"CODEC_PT":9, "CLOCK":8000,"CODEC_NAME":"g722","DIR":0,"REPORT_NAME":"'+pub_ip+':26872","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 34,
                          srcIp: peer_ip,
                          dstIp: pub_ip,
                          srcPort: 0,
                          dstPort: 0,
                          mos: 393,
                          correlation_id: call_id
                  },
    		  pause: 2500,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":11.983,"JITTER":0.011,"REPORT_TS":'+new Date().getTime()/1000+',"TL_BYTE":0,"SKEW":0.000,"TOTAL_PK":1512,"EXPECTED_PK":1512,"PACKET_LOSS":0,"SEQ":0,"MAX_JITTER":0.210,"MAX_DELTA":20.124,"MAX_SKEW":0.221,"MEAN_JITTER":0.305,"MIN_MOS":3.932, "MEAN_MOS":3.932, "MOS":3.932,"RFACTOR":77.100,"MIN_RFACTOR":77.100,"MEAN_RFACTOR":77.100,"SRC_IP":"'+peer_ip+'", "SRC_PORT":26872, "DST_IP":"'+peer_ip+'","DST_PORT":51354,"SRC_MAC":"00-30-48-7E-5D-C6","DST_MAC":"00-12-80-D7-38-5E","OUT_ORDER":0,"SSRC_CHG":0,"CODEC_PT":9, "CLOCK":8000,"CODEC_NAME":"g722","DIR":0,"REPORT_NAME":"'+peer_ip+':26872","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 34,
                          srcIp: pub_ip,
                          dstIp: peer_ip,
                          srcPort: 0,
                          dstPort: 0,
                          mos: 393,
                          correlation_id: call_id
                  },
    		  pause: 2500,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":19.983,"JITTER":0.017,"REPORT_TS":'+new Date().getTime()/1000+',"TL_BYTE":0,"SKEW":0.000,"TOTAL_PK":1511,"EXPECTED_PK":1512,"PACKET_LOSS":1,"SEQ":0,"MAX_JITTER":0.010,"MAX_DELTA":20.024,"MAX_SKEW":0.172,"MEAN_JITTER":0.005,"MIN_MOS":4.032, "MEAN_MOS":4.032, "MOS":4.032,"RFACTOR":80.200,"MIN_RFACTOR":80.200,"MEAN_RFACTOR":80.200,"SRC_IP":"'+pub_ip+'", "SRC_PORT":26872, "DST_IP":"'+peer_ip+'","DST_PORT":51354,"SRC_MAC":"00-30-48-7E-5D-C6","DST_MAC":"00-12-80-D7-38-5E","OUT_ORDER":0,"SSRC_CHG":0,"CODEC_PT":9, "CLOCK":8000,"CODEC_NAME":"g722","DIR":0,"REPORT_NAME":"'+pub_ip+':26872","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 34,
                          srcIp: peer_ip,
                          dstIp: pub_ip,
                          srcPort: 0,
                          dstPort: 0,
                          mos: 402,
                          correlation_id: call_id
                  },
    		  pause: 2500,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":11.983,"JITTER":0.011,"REPORT_TS":'+new Date().getTime()/1000+',"TL_BYTE":0,"SKEW":0.000,"TOTAL_PK":1512,"EXPECTED_PK":1512,"PACKET_LOSS":0,"SEQ":0,"MAX_JITTER":0.210,"MAX_DELTA":20.124,"MAX_SKEW":0.221,"MEAN_JITTER":0.305,"MIN_MOS":3.932, "MEAN_MOS":3.932, "MOS":3.932,"RFACTOR":77.100,"MIN_RFACTOR":77.100,"MEAN_RFACTOR":77.100,"SRC_IP":"'+peer_ip+'", "SRC_PORT":26872, "DST_IP":"'+peer_ip+'","DST_PORT":51354,"SRC_MAC":"00-30-48-7E-5D-C6","DST_MAC":"00-12-80-D7-38-5E","OUT_ORDER":0,"SSRC_CHG":0,"CODEC_PT":9, "CLOCK":8000,"CODEC_NAME":"g722","DIR":0,"REPORT_NAME":"'+peer_ip+':26872","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 34,
                          srcIp: pub_ip,
                          dstIp: peer_ip,
                          srcPort: 0,
                          dstPort: 0,
                          mos: 393,
                          correlation_id: call_id
                  },
    		  pause: 2500,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":19.983,"JITTER":0.017,"REPORT_TS":'+new Date().getTime()/1000+',"TL_BYTE":0,"SKEW":0.000,"TOTAL_PK":1511,"EXPECTED_PK":1512,"PACKET_LOSS":1,"SEQ":0,"MAX_JITTER":0.010,"MAX_DELTA":20.024,"MAX_SKEW":0.172,"MEAN_JITTER":0.005,"MIN_MOS":4.032, "MEAN_MOS":4.032, "MOS":4.032,"RFACTOR":80.200,"MIN_RFACTOR":80.200,"MEAN_RFACTOR":80.200,"SRC_IP":"'+pub_ip+'", "SRC_PORT":26872, "DST_IP":"'+peer_ip+'","DST_PORT":51354,"SRC_MAC":"00-30-48-7E-5D-C6","DST_MAC":"00-12-80-D7-38-5E","OUT_ORDER":0,"SSRC_CHG":0,"CODEC_PT":9, "CLOCK":8000,"CODEC_NAME":"g722","DIR":0,"REPORT_NAME":"'+pub_ip+':26872","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 35,
                          srcIp: peer_ip,
                          dstIp: pub_ip,
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id+'_b2b-1',
			  mos: 440
                  },
    		  pause: 2500,
		  payload: '{"CORRELATION_ID":"'+call_id+'", "RTP_SIP_CALL_ID":"'+call_id+'","MOS":4.409,"RFACTOR":93.200,"DIR":0,"REPORT_NAME":"'+peer_ip+'","PARTY":0,"TYPE":"PERIODIC"}'
}, {
                // RTCP Report
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: 2001,
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 35,
                          srcIp: pub_ip,
                          dstIp: peer_ip,
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id,
			  mos: 410
                  },
    		  pause: 1000,
		  payload: '{"CORRELATION_ID":"'+call_id+'", "RTP_SIP_CALL_ID":"'+call_id+'_b2b-1","MOS":4.101,"RFACTOR":91.200,"DIR":1,"REPORT_NAME":"'+pub_ip+'","PARTY":0,"TYPE":"PERIODIC"}'
/* END RTCP */

}

]

};

// ------------------------------------------------------

module.exports = config;
