FROM node:alpine

WORKDIR /home/eduardo/docker

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 4000

CMD ["npm", "start"]