// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

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
    			payload_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.1',
    			dstIp: '192.168.1.2',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 0,
            payload: 'INVITE sip:nodejs@127.0.0.1 SIP/2.0\nCall-ID: '+call_id+'\nCSeq: 1 INVITE\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>\nVia: SIP/2.0/UDP 127.0.0.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332\nMax-Forwards: 70\nAllow: INVITE, ACK, CANCEL, BYE\nUser-Agent: HEPGEN-UAC\nContent-Type: application/sdp\nContent-Length: 287\n\nv=0\no=nodejs-Session 1028236597 1930329353 IN IP4 127.126.124.123s=nodejs\nc=IN IP4 127.126.124.123\nt=0 0\nm=audio 5072 RTP/AVP 18 0 8 101\na=fmtp:101 0-15\na=rtpmap:18 G729/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:8 PCMA/8000\na=rtpmap:101 telephone-event/8000\na=ptime:20\na=sendrecv\r\n\r\n'
        },
        {
            // SIP Response 100 Trying
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			payload_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.2',
    			dstIp: '192.168.1.1',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 200,
            payload: 'SIP/2.0 100 Trying\nCall-ID: '+call_id+'\nCSeq: 1 INVITE\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.369f\nVia: SIP/2.0/UDP 192.168.1.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332;rport=48495\nUser-Agent: HEPGEN-UAS\nContent-Length: 0\r\n\r\n'
        },
        {
            // SIP Response 407
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			payload_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.2',
    			dstIp: '192.168.1.1',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 800,
            payload: 'SIP/2.0 407 Proxy Authentication Required\nCall-ID: '+call_id+'\nCSeq: 1 INVITE\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.369f\nVia: SIP/2.0/UDP 192.168.1.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332;rport=48495\nProxy-Authenticate: Digest realm="127.0.0.1", nonce="VmsCHVZrAPHQLsMOHd44GstzBKBncUuh"\nUser-Agent: HEPGEN-UAS\nContent-Length: 0\r\n\r\n'
        },
        {
            // SIP Request
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			payload_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.1',
    			dstIp: '192.168.1.2',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 1000,
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
                protocolFamily: 2,
                protocol: 17,
                payloadType: 100,
                srcIp: '192.168.1.1',
                dstIp: '192.168.1.2',
                srcPort: 0,
                dstPort: 0,
                correlation_id: call_id
            },
    		pause: 1000,
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
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.2',
    			dstIp: '192.168.1.1',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 1200,
            payload: 'SIP/2.0 200 Alive\nRecord-Route: <sip:127.0.0.1;r2=on;lr=on;ftag=2628881569;socket=udp:127.0.0.1:5060>\nCall-ID: '+call_id+'\nCSeq: 9999 OPTIONS\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.369f\nVia: SIP/2.0/UDP 192.168.1.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332;rport=48495\nUser-Agent: HEPGEN-UAS\nContent-Length: 0\r\n\r\n' 
    	},
        {
            // SIP PUBLISH RTCP-XR Vq
    		rcinfo: {
    			type: 'HEP',
    			version: 3,
    			payload_type: 1,
    			captureId: '2001',
    			capturePass: 'myHep',
    			protocolFamily: 2,
    			protocol: 17,
    			payloadType: 1,
    			correlation_id: call_id,
    			srcIp: '192.168.1.1',
    			dstIp: '192.168.1.2',
    			srcPort: 5060,
    	  		dstPort: 5060
    		},
    		pause: 1300,
            payload: 'PUBLISH sip:nodejs@127.0.0.1:5999;transport=udp SIP/2.0\nCall-ID: '+call_id+'\nCSeq: 1 PUBLISH\nFrom: <sip:nodejs@127.0.0.1>;tag=2628881569\nTo: <sip:nodejs@127.0.0.1>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.369f\nVia: SIP/2.0/UDP 192.168.1.1:48495;branch=z9hG4bK9b82aa8fb4c7705466a3456dfff7f384333332\nUser-Agent: HEPGEN-UAS\nContent-Type: application/vq-rtcpxr\nContent-Length: 450\n\nVQIntervalReport\nLocalMetrics:\nSessionDesc:PT=124 PD=opus SR=48000\nTimestamps:START=2015-02-28T21:04:31.000582Z STOP=2015-02-28T21:04:36.000598Z\nCallID:'+call_id+'\nFromID:<sip:caller@domain.net>\nToID:<sip:callee@domain.net>\nOrigID:<sip:caller@domain.net>\nLocalAddr:IP:192.168.1.55 PORT:30539\nLocalMAC:99:e6:ba:df:7b:dd\nRemoteAddr:IP:192.168.1.23 PORT:7079\nRemoteMAC:99:72:b9:28:c2:82\nPacketLoss:NLR=8.0\nDelay:IAJ=93\r\n\r\n'
    	},
    	/*
          {
          // QoS Report
          rcinfo: {
          type: 'HEP',
          version: 3,
          payload_type: 'JSON',
          captureId: '2001',
          capturePass: 'myHep',
          ip_family: 2,
          protocol: 17,
          proto_type: 99,
          srcIp: '192.168.1.1',
          dstIp: '192.168.1.2',
          srcPort: 0,
          dstPort: 0,
          correlation_id: call_id
          },
    	  pause: 1300,
		  payload: '{"CORRELATION_ID":"'+call_id+'","RTP_SIP_CALL_ID":"'+call_id+'","DELTA":19.971924,"JITTER":0.162653,"REPORT_TS":1443793820,"TL_BYTE":0,"SKEW":0.701172, "TOTAL_PK":1783,"PACKET_LOSS":0,"SEQ":0,"MAX_JITTER":0.575890,"MAX_DELTA":140.515137,"MAX_SKEW":-1.395996,"MEAN_JITTER":0.196664,"MIN_MOS":4.324768, "MEAN_MOS":4.394112, "MOS":4.394147,"RFACTOR":92.442569,"MIN_RFACTOR":89.429284,"MEAN_RFACTOR":92.440869,"SRC_IP":"192.168.1.1", "SRC_PORT":21122, "DST_IP":"192.168.1.2","DST_PORT":52268,"CODEC_PT":8, "CLOCK":8000,"CODEC_NAME":"pcma","TYPE":"HANGUP"}'
          },
        */
        {
            // RTCP Report
            rcinfo: {
                type: 'HEP',
                version: 3,
                payload_type: 'JSON',
                captureId: '2001',
                capturePass: 'myHep',
                protocolFamily: 2,
                protocol: 17,
                payloadType: 5,
                srcIp: '192.168.1.1',
                dstIp: '192.168.1.2',
                srcPort: 0,
                dstPort: 0,
                correlation_id: call_id
            },
    		pause: 1300,
		    payload: '{"sender_information":{"ntp_timestamp_sec":3650797214,"packets":106,"ntp_timestamp_usec":13217348104192,"octets":16960,"rtp_timestamp":16960},"ssrc":451916597,"type":200,"report_blocks":[{"source_ssrc":898343773,"highest_seq_no":20881,"fraction_lost":0,"ia_jitter":1,"packets_lost":0,"lsr":-1097006646,"dlsr":7733}],"report_count":0}'

        }

    ]
};

// ------------------------------------------------------

module.exports = config;
