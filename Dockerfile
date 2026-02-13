FROM node:20

# install nmap
RUN apt-get update && apt-get install -y nmap

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "server.js"]
