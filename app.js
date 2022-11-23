const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//appelation de route (url)

const routes = require("./routes")

const app = express();
const mongoose = require('mongoose');
dotenv.config({ path: './.env'});

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});  

mongoose.connection.once('open', () => {
 	console.log('Et la connexion à la base de donnée est bien établie...');
 	}).on('error', (error) => { 
 	console.log('Tentative de connexion a echouée:', error);
});

app.set('view engine', 'ejs'); 
//app.set('views', path.resolve(__dirname, "views/ejs"))


// Importation de tous les fichiers static utilisés
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Importations des fichiers static
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/file', express.static(__dirname + '/static/css'));
app.use('/file', express.static(__dirname + '/static/css/vendor'));
app.use('/file', express.static(__dirname + '/static/css/vendor/bootstrap/js'));
app.use('/file', express.static(__dirname + '/static/css/vendor/jquery-easing'));
app.use('/file', express.static(__dirname + '/static/css/vendor/chart.js'));
app.use('/file', express.static(__dirname + '/static/css/vendor/fontawesome-free/css'));
app.use('/file', express.static(__dirname + '/static/js'));
app.use('/file', express.static(__dirname + '/static/js/demo'));
app.use('/file', express.static(__dirname + '/static/img'));
app.use(routes)

module.exports = app;