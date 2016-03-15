<img src="https://i.imgur.com/scqdu3p.png" width="400">

# HEPGEN.JS
Barebone HEP Packet Generator for SIP-less Devs and Unit Testing


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
npm install
```

### Run
```
npm start
```

### Custom Config
```
npm start -c "./config/options/"
```

### Debug
```
node hepgen.js -d
```


