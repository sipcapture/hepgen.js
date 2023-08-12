FROM node:16
MAINTAINER @qxip (twitter)
RUN git clone https://github.com/sipcapture/hepgen.js
WORKDIR hepgen.js
RUN npm install
CMD ["node", "hepgen.js"]
