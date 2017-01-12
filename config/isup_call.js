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

var hextostring = function(hexstring) {
    return new Buffer(hexstring, 'hex').toString();
}

var ext1_stp = randomIp();
var int1_stp = randomIp();


var iam = hextostring('0100060100000054000100080000000103000044c500000001a900011020010a00020a0803102618850325f80a088313982648224619fe01001d038090a33102005a3d011e03047d0291813906fed031c03dc000');
var acm = hextostring('010006010000002000010008000000010300000fc500040000a9000600000000');
var cpg_progress = hextostring('0100060100000028000100080000000103000016c500040000a9002c020111021634290101000000');
var cpg_alerting = hextostring('0100060100000028000100080000000103000016c500040000a9002c010111021634290101000000');
var rel = hextostring('0100060100000024000100080000000103000011c500000001a9000c0200028090000000');
var rlc = hextostring('010006010000002000010008000000010300000dc500040000a9001000000000');


// Simple call

var config = {
    NAME: 'M2UA/M2PA ISUP call',
    HEP_SERVER: '127.0.0.1',
    HEP_PORT: 9060,
    HEP_ID: '2001',
    HEP_AUTH: 'myHep',
    // the Messages to send
    MESSAGES: [

{
    // IAM
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: ext1_stp,
        dstIp: int1_stp,
        srcPort: 2904,
        dstPort: 7234
    },
    pause: 250,
    payload: iam
},
{
    // ACM
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: int1_stp,
        dstIp: ext1_stp,
        srcPort: 7234,
        dstPort: 2904 
    },
    pause: 250,
    payload: acm
},
{
    // CPG #1 PROGRESS
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: int1_stp,
        dstIp: ext1_stp,
        srcPort: 7234,
        dstPort: 2904 
    },
    pause: 250,
    payload: cpg_progress
},
{
    // CPG #2 ALERTING
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: int1_stp,
        dstIp: ext1_stp,
        srcPort: 7234,
        dstPort: 2904 
    },
    pause: 250,
    payload: cpg_alerting
},
{
    // REL
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: ext1_stp,
        dstIp: int1_stp,
        srcPort: 2904,
        dstPort: 7234,
    },
    pause: 250,
    payload: rel
},
{
    // RLC
    rcinfo: {
        type: 'HEP',
        version: 3,
        payload_type: 1,
        captureId: '2001',
        capturePass: 'myHep',
        ip_family: 2,
        protocol: 132,
        proto_type: 0x08,
        correlation_id: '',
        srcIp: int1_stp,
        dstIp: ext1_stp,
        srcPort: 7234,
        dstPort: 2904 
    },
    pause: 250,
    payload: rlc
}
    ]
}

module.exports = config;
