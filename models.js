const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//table pour capteur de temperature*******************************
const capteurtempSchema = mongoose.Schema({
    capteurtemp_values: {type: Number},
    capteurtemp_Date: {type: String},
})

//table pour capteur humiditer**********************************
const capteurhumidSchema = mongoose.Schema({
    capteurhumid_values: {type: Number},
    capteurhumid_Date: {type: String},
})

//table pour capteur de gaz****************************************
const capteurgazSchema = mongoose.Schema({
    capteurgaz_values: {type: Number},
    capteurgaz_Date: {type: String},
})

//table pour notification********************************************
const notificationSchema = mongoose.Schema({
    msg: {type: String},
    date: {type: String},
    vu: {type: Boolean, default: false}
})

//table pour capteur de niveau d'eau*******************************
const capteurniveauSchema = mongoose.Schema({
    capteur_niveau_valuer: {type: String},
    date: {type: String},
})

//table pour utilisateur***********************************
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    date: { type: String, required: false },
    sexe: { type: String, required: true },
    superuser: { type: Boolean, default: false, required: true},
    connected: { type: Boolean, required: false}, 
  }); 

  //table pour commande lampe chauffante***************************
  const lampechauffanteSchema = mongoose.Schema({
    etat_lampe: {type: Boolean, default: false},
    activation_lampe: {type: Boolean, default: false},
})

exports.lampe = mongoose.model('lampe', lampechauffanteSchema)
exports.User = mongoose.model('User', userSchema)
exports.abreuvoir = mongoose.model('abreuvoir', capteurniveauSchema)
exports.gaz = mongoose.model("gaz", capteurgazSchema)
exports.humidite = mongoose.model("humidite", capteurhumidSchema)
exports.notification = mongoose.model("notification", notificationSchema)
exports.capteurtemp = mongoose.model("capteurtemp", capteurtempSchema)

