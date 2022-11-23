const DB = require("./models")
const Methods = require('./methods')

exports.index = async(req, res)=>{
    /*
    const new_temp_value = new DB.capteurtemp({
        capteurtemp_values : 25,
        capteurtemp_date: Methods.nowDateToString()
    })
    new_temp_value.save().then(succes=>{
        res.render('pages/index')
    })

    */  
   await DB.capteurtemp.find().then(list=>{
        res.render('pages/index', {capteurtemp: list.reverse()})
   })
}

//


exports.registerCapteurTempValue = async(req, res)=>{
    try{
        var data = req.originalUrl
        data = data.split("?=")[1]
        data = data.split("_")
        var temp = data[0]
        var humid = data[1]
        var gaz = data[2]
        if(!temp || !humid || !gaz) return res.send("err")
        const new_temp = new DB.capteurtemp({
            capteurtemp_values: Number(temp),
            capteurtemp_date:   Methods.nowDateToString()
        })
//
        new_temp.save().then(succes=>{
            const new_humid = new DB.humidite({
                capteurhumid_values: Number(humid),
                capteurhumid_date:   Methods.nowDateToString()
            })
        
            new_humid.save().then(succes=>{
                const new_gaz = new DB.gaz({
                    capteurgaz_values: Number(gaz),
                    capteurgaz_date:   Methods.nowDateToString()
                })
            
                new_gaz.save().then(succes=>{
                    if (Number(temp)>34)
                    {
                        var message_haut= 'Alert temperature très éléver'
                        var temp_haut= Number(temp)
                        registreNotifTemp(message_haut, temp_haut)
                    }
                    if (Number(temp)<25)
                    {
                        var message_bas= 'Alert temperature très bas'
                        var temp_bas= Number(temp)
                        registreNotifTemp(message_bas, temp_bas)
                    }
                    return res.send({msg: "Donnée enregistré !"})
                })
            })

        })
    }catch(err){
        console.log(err)
        return res.send("err")
    }
}


exports.getActualValues = async(req, res)=>{
    const temperature = await new Promise((success)=>{
        DB.capteurtemp.find().then(list=>{
            success(list[list.length - 1])
        })

    })
    return res.send({temperature: temperature})
}


exports.getHumiditeValues = async(req, res)=>{
    const humidite = await new Promise((success)=>{
        DB.humidite.find().then(list=>{
            success(list[list.length - 1])
        })
    })

    return res.send({humidite: humidite})
}


exports.getNotificationValue =async(req, res)=>{
    const notification = await new Promise((success)=>{
        DB.notification.find({vu: false}).then(list=>{
            success(list)
        })
    })

    return res.send({notification: notification})
}

exports.modifNotif = async(req, res)=>{
    let ids = req.body.ids
    const _res = await new Promise((success)=>{
        for (var i = 0; i < ids.length; i++){
            DB.notification.findByIdAndUpdate(ids[i], {vu: true}).then(is_ok=>{
                console.log(is_ok)
                if(!is_ok) success(false)
            })
        }
        success(true)
    })
//
    return res.send({success: _res})
}

 const registreNotifTemp = (message, valeur )=>{
    var message= message
    var data = valeur
    const new_notif = new DB.notification({
        msg: message +" "+Number(data)+'°C',
        date:   Methods.nowDateToString()
    })

    new_notif.save().then(succes=>{
        console.log("Donnée enregistrée...")
    })
}
/*
exports.getPersonneNumber = async(req, res)=>{
    var data = req.originalUrl
    console.log("data: ", data)

    return res.send({msg: "On y est !"})
}
*/