const express = require('express');
const bodyParser = require('body-parser');
const urlParserencoder = bodyParser.urlencoded({ extended: false}); 
const router = express.Router();
const API = require('./API')


router.get("/", urlParserencoder, API.index)
router.post("/register_capteur_temp_value",urlParserencoder, API.registerCapteurTempValue)


//router.get("/get_person_number", API.getPersonneNumber)
router.get("/get_actual_value",urlParserencoder, API.getActualValues)
router.get("/get_humidite_value",urlParserencoder, API.getHumiditeValues)
router.get("/get_notification_value",urlParserencoder, API.getNotificationValue)

router.post("/modif_notif", urlParserencoder, API.modifNotif)

module.exports = router;  