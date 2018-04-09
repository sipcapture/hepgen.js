// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

var config = {
        NAME: 'LOG Lines',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [
          {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 100,
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
    		          pause: 1000,
                  payload: 'SYSLOG: Processing OPTIONS request from nodejs using Call-Id: '+call_id
          },
          {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 100,
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
    		          pause: 1000,
                  payload: '{ "this": { "is": "a JSON object" }, "int": 1234 }'
          }
      ]
};

// ------------------------------------------------------

module.exports = config;
