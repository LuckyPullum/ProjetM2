const http = require('http');
const app = require('./app');



//Connecter dans le serveur
PORT = process.env.PORT || 8080;
const server = http.createServer(app);
//const PORT = 19010;
//const IP = "192.168.43.187";
server.listen(PORT, () => {
	console.log('Le serveur a bien démaré sur le port '+PORT);
}); 
  