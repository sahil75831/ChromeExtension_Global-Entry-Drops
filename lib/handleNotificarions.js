export const handleNotifications = (activeAppointment) => {
    console.log("active appointment ", activeAppointment)
    if(activeAppointment){
        createNotification(activeAppointment[0])
    }
}
const createNotification = (activeAppointment) => {
    chrome.notifications.create({
        title:"Global Entry Drops",
        message:`found an open Interview at`,
        iconUrl:"../images/icon-48.png",
        type:"basic"

    })
}

chrome.notifications.onClicked.addListener(()=>{
    chrome.tabs.create({url:"https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry"})
})