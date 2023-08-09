<img src="https://user-images.githubusercontent.com/1423657/55069501-8348c400-5084-11e9-9931-fefe0f9874a7.png" width=200/>

# HEPGEN.JS
Barebone HEP Packet Generator for SIP-less Devs and Unit Testing, supporting UDP or TCP transport.


![](http://i.imgur.com/Z3xYbDh.png)

### Configure
Edit ```config.js``` and create your HEP scenario with the following structure:
```
var config = {
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        MESSAGES: [
          {
      		  rcinfo: { <HEP_HEADER> },
      		  pause: 0,
            payload: <sip message>
          },
          {
      		  rcinfo: { <HEP_HEADER> },
      		  pause: 1000,
            payload: <sip message>
          }
        ]
}
```
See [config.json](https://github.com/sipcapture/hepgen.js/blob/master/config/default.js) for a working example using SIP OPTIONS and a fictional Syslog


### Install
```
npm install -g hepgen.js
```

### Run
Replace `127.0.0.1` and `9060` with the actual IP and PORT of your HEP Server. Default transport is `udp`:
```
hepgen.js -s 127.0.0.1 -p 9060 -c "./config/b2bcall_rtcp.js"
```

To turn on `tcp` transport add -t tcp to your command:
```
hepgen.js -s 127.0.0.1 -p 9061 -c "./config/b2bcall_rtcp.js" -t tcp
```

To turn on `tls` transport add -t tls to your command:
```
hepgen.js -s 127.0.0.1 -p 9443 -c "./config/b2bcall_rtcp.js" -t tls
```

### Custom Config
```
hepgen.js -c "./config/options.js"
```

### Custom Config + Loki
```
hepgen.js -a my.loki.host -c "./config/b2bcall_rtcp_logs.js"
```

### Custom from PCAP TEXT
```
hepgen.js -s 127.0.0.1 -p 9063 -P "./path/to/SIP.pcap-txt"
```

### Debug
```
hepgen.js -d
```

### Loop a Call multiple times (Be careful how you use it)
```
hepgen.js -s 127.0.0.1 -p 9060 -c "./config/loop_simple.js" --loop 5 //loop same call 5 times
```
