// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

var config = {
        
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [
        {
                // SIP Request
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
                          srcIp: '192.168.1.1',
                          dstIp: '192.168.1.2',
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
    		  pause: 0,
                  payload: 'SYSLOG: Processing OPTIONS request from nodejs using Call-Id: '+call_id
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
    	  },
          {
                // QoS Probe Report, random values
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 33,
                          srcIp: '192.168.1.1',
                          dstIp: '192.168.1.2',
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
    		  pause: 1000,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":19.971924,"JITTER":0.162653,"REPORT_TS":1443793820,"TL_BYTE":0,"SKEW":0.701172, "TOTAL_PK":1783,"PACKET_LOSS":0,"SEQ":0,"MAX_JITTER":0.575890,"MAX_DELTA":140.515137,"MAX_SKEW":-1.395996,"MEAN_JITTER":0.196664,"MIN_MOS":4.324768, "MEAN_MOS":4.394112, "MOS":4.394147,"RFACTOR":92.442569,"MIN_RFACTOR":89.429284,"MEAN_RFACTOR":92.440869,"SRC_IP":"192.168.1.1", "SRC_PORT":21122, "DST_IP":"192.168.1.2","DST_PORT":52268,"CODEC_PT":8, "CLOCK":8000,"CODEC_NAME":"pcma","TYPE":"HANGUP"}'
          },
	  {
                // RTCP Report, random values
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 'JSON',
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 5,
                          srcIp: '192.168.1.1',
                          dstIp: '192.168.1.2',
                          srcPort: 0,
                          dstPort: 0,
                          correlation_id: call_id
                  },
                  pause: 1000,
		  payload: '{"sender_information":{"ntp_timestamp_sec":3650797214,"packets":106,"ntp_timestamp_usec":13217348104192,"octets":16960,"rtp_timestamp":16960},"ssrc":451916597,"type":200,"report_blocks":[{"source_ssrc":898343773,"highest_seq_no":20881,"fraction_lost":0,"ia_jitter":1,"packets_lost":0,"lsr":-1097006646,"dlsr":7733}],"report_count":0}'
	  }
      ]
};

// ------------------------------------------------------

module.exports = config;
