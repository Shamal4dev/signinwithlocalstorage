const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const dbPort = process.env.PORT +'api' || 4000;
const appPort = process.env.PORT || 3000;
server.use(middlewares);
server.use(router);

server.listen(dbPort);

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(appPort, err => {
    if(err) throw err;
   console.log('Server is up!');
});


