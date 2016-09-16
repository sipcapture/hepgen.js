// HEPGEN-JS SIP BYE&OK with X-RTP-Stats + Logs Template
// ------------------------------------------------------

var rand = function(maximum,minimum){
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

var call_id     = Math.random().toString(36).substring(7) + '@127.0.0.1';
var caller      = 'hepgenjs';
var caller_e164 = '+49221'+rand(100000,999999);
var callee      = '+49228'+rand(100000,999999);
var domain      = 'sipcapture.org';
var priv_ip     = '192.168.10.'+rand(10,200);
var priv_nat    ='10.20.30.40';
var pub_ip      = '20.30.40.50';
var peer_ip     ='55.66.77.'+rand(80,88);
var localhost   = '127.0.0.1';
var useragent   = 'hepgen';

var cs          = rand(1000,45000);
var ps          = rand(1000,20000);
var es          = rand(1000,20000);
var os          = rand(10000,200000);
var pr          = rand(1000,20000);
var er          = rand(1000,20000);
var or          = rand(10000,200000);
var pl          = rand(0,100)+','+rand(0,100);
var bl          = rand(0,2000);
var ls          = rand(0,2000);
var ji          = rand(10,300)+','+rand(20,600);
var dl          = rand(10,200)+','+rand(10,200)+','+rand(10,200);
var codecs      = Array('PCMA','PCMU','PCMA/16000','PCMU/16000','iLBC-20','iLBC-30','G726-16','G726-24','G726-32','G726-40','G722','G729');
var en          = codecs[Math.floor(Math.random()*codecs.length)];
var de          = codecs[Math.floor(Math.random()*codecs.length)];
var dq          = rand(0,200);
var dss         = rand(0,100);
var ds          = rand(0,100);
var plcs        = rand(100,2000);
var js          = rand(0,100);


var config = {
        NAME: 'SIP BYE&OK with X-RTP-Stats + Logs',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
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
                dstIp: peer_ip,
                srcPort: 5060,
                dstPort: 50195
        },
        pause: 50,
        payload:
        'BYE sip:'+callee+'@'+peer_ip+':5060 SIP/2.0\r\n'+
        'Via: SIP/2.0/UDP '+priv_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\r\n'+
        'Max-Forwards: 70\r\n'+
        'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
        'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
        'Call-ID: '+call_id+'_b2b-1\r\n'+
        'CSeq: 11 BYE\r\n'+
        'X-RTP-Stat: CS='+cs+';PS='+ps+';ES='+es+';OS='+os+';SP=0/0;SO=0;QS=-;PR='+pr+';ER='+er+';OR='+or+';CR=0;SR=0;QR=-;PL='+pl+';BL='+bl+';LS='+ls+';RB=0/0;SB=-/-;EN='+en+';DE='+de+';JI='+ji+';DL='+dl+';IP='+priv_nat+':50195,'+peer_ip+':5060\r\n'+
        'X-RTP-Stat-Add: DQ='+dq+';DSS='+dss+';DS='+ds+';PLCS='+plcs+';JS='+js+'\r\n'+
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
                dstIp: priv_nat,
                srcPort: 50195,
                dstPort: 5060
        },
        pause: 50,
        payload:
        'SIP/2.0 200 OK\r\n'+
        'Via: SIP/2.0/UDP '+priv_ip+';branch=z9hG4bK4365.06a69ebee036f6f8370157779c11ff70.0\r\n'+
        'From: <sip:'+caller_e164+'@'+domain+'>;tag=06DE7CEB-56E458BB000864AD-B855F700\r\n'+
        'To: <sip:'+callee+'@'+peer_ip+'>;tag=as6db2fc4d\r\n'+
        'Call-ID: '+call_id+'_b2b-1\r\n'+
        'CSeq: 11 BYE\r\n'+
        'X-RTP-Stat: CS='+cs+';PS='+ps+';ES='+es+';OS='+os+';SP=0/0;SO=0;QS=-;PR='+pr+';ER='+er+';OR='+or+';CR=0;SR=0;QR=-;PL='+pl+';BL='+bl+';LS='+ls+';RB=0/0;SB=-/-;EN='+en+';DE='+de+';JI='+ji+';DL='+dl+';IP='+priv_nat+':50195,'+peer_ip+':5060\r\n'+
        'X-RTP-Stat-Add: DQ='+dq+';DSS='+dss+';DS='+ds+';PLCS='+plcs+';JS='+js+'\r\n'+
        'User-Agent: hepgen\r\n'+
        'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY\r\n'+
        'Supported: replaces\r\n'+
        'Content-Length: 0\r\n'+
        '\r\n\r\n'
}, {
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
                  pause: 50,
                  payload: 'INFO: TS='+new Date().toISOString()+' <script>: QoS-Parameter via a X-RTP-Stat header - R=sip:'+callee+'@'+domain+' ID='+call_id                  
                  
 }

]

};

// ------------------------------------------------------

module.exports = config;
