FROM node:lts-alpine3.20

WORKDIR /
COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build
CMD [ "npm", "run", "start" ] 
