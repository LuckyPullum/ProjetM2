$(document).ready(()=>{
    const notifBox = $("#notif_value")
    const notifValue = localStorage.getItem("notif")
    if(Number(notifValue)>0){
        notifBox.text(notifValue+"+")
    }else{
        notifBox.text("")
    }
    update();

    $("#notif-btn").on("click", ()=>{
        modifNotif()
    })
})

const update = ()=>{ 
    setTimeout(()=>{
        on_update()
        on_update_humidite()
        update_notification()
        update(); // execution de la fonction update la prémière fois
}, 2000);
}

const on_update = ()=>{
    const box = $('#temperature')
    $.ajax({
        method: "get",
        url: "/get_actual_value",
        success: (response, status, xhr) => {
            const temperature = response.temperature
            box.text(temperature.capteurtemp_values+"°C")
        },
        error: (response, status, xhr) => {
            console.log("Une erreur s'est produite !")
        }
    })
}

const on_update_humidite = ()=>{
    const box = $('#humidite')
    $.ajax({
        method: "get",
        url: "/get_humidite_value",
        success: (response, status, xhr) => {
            const humidite = response.humidite
            box.text(humidite.capteurhumid_values +"%")
        },
        error: (response, status, xhr) => {
            console.log("Une erreur s'est produite !")
        }
    })
}

const update_notification = ()=>{
    const box = $('#notification')
    $.ajax({
        method: "get",
        url: "/get_notification_value",
        success: (response, status, xhr) => {
            //
           
                const notification = response.notification;
                if(notification){
                    const notifBox = $("#notif_value")
                    let long = Number(localStorage.getItem("notif"))
                    if(notification.length > long){
                        notifBox.text(notification.length+"+")
                        localStorage.setItem("notif", notification.length + "")
                        $('#notification').html('');
                        var notif_ids = ""
                        for (var i = 0; i < notification.length; i++){
                            if(i != notification.length - 1) notif_ids = notif_ids + notification[i]._id + "_"
                            else notif_ids = notif_ids + notification[i]._id
                            rechargeNotification(notification[i])     
                        }
                        localStorage.setItem("notif_ids", notif_ids)
                    }
                }
               
        },
        error: (response, status, xhr) => {
            console.log("Une erreur s'est produite !")
        }
    })
}


const modifNotif = ()=>{
    var ids = localStorage.getItem("notif_ids")
    ids = ids.split("_")
    $.ajax({
        method: "post",
        url: "/modif_notif",
        data: {ids: ids},
        success: (response, status, xhr) => {
           if(response.success){
            localStorage.setItem("notif", "0")
            const notifBox = $("#notif_value")
            notifBox.text("0")
           }    
        },
        error: (response, status, xhr) => {
            console.log("Une erreur s'est produite !")
        }
    })
}
function rechargeNotification(data){
   var html = "<a class='dropdown-item d-flex align-items-center' href='#'>"
            +"<div class='mr-3'>"
                +"<div class='icon-circle bg-warning'>"
                    +"<i class='fas fa-exclamation-triangle text-white'></i>"
                +"</div>"
            +"</div>"
            +"<div>"
                +"<div class='small text-gray-500'>"+data.date+"</div>"
                +"<span class='font-weight-bold'>"+data.msg+"</span>"
            +"</div>"
        +"</a>";
    $('#notification').append(html);
}
