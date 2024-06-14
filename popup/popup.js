//INPUT  ELEMENTS
const locationIdElement = document.getElementById("locationId")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

// BUTTON ELEMENTS
const save_startButtonElement = document.getElementById("startButton")
const stopButtonElement = document.getElementById("stopButton")

save_startButtonElement.onclick = () => {
    const prefs = {
        locationId : locationIdElement.value,
        startDate : startDateElement.value,
        endDate : endDateElement.value
    }
    chrome.runtime.sendMessage({event : "onStart", prefs})
}
stopButtonElement.onclick = () => {
    
}


chrome.storage.local.get(["locationId", "startDate", "endDate"] , result => {
    const {locationId, startDate, endDate} = result;
    if(locationId){
        locationIdElement.value = locationId
    }
    if(startDate){
        startDateElement.value = startDate
    }
    if(endDate){
        endDateElement.value = endDate
    }
})