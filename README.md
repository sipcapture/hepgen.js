# HEPGEN.JS
Barebone HEP Packet Generator for SIP-less Devs

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

### Install
```
npm install
```

### Run
```
npm start
```



