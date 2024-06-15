//INPUT  ELEMENTS
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

// BUTTON ELEMENTS
const save_startButtonElement = document.getElementById("startButton");
const stopButtonElement = document.getElementById("stopButton");

// STATUS SPAN
const runningSpan = document.getElementById("runningSpan")
const stoppedSpan = document.getElementById("stoppedSpan")

const handleOnStartState = () => {
  runningSpan.style.backgroundColor = "rgb(249, 249, 64)"
  stoppedSpan.style.backgroundColor = "black"
  stoppedSpan.style.color = "white"
  runningSpan.style.transition = "all 0.5s ease-in" 
  runningSpan.style.color = "black"
 
}
const handleOnStopState = () => {
  stoppedSpan.style.backgroundColor = "rgb(249, 249, 64)"
  stoppedSpan.style.color = "black"
  runningSpan.style.backgroundColor = "black"
  runningSpan.style.color = "white"
  runningSpan.style.transition = "all 0.5s ease-in" 

}

save_startButtonElement.onclick = () => {

  const prefs = {
    locationId: locationIdElement.value,
    startDate: startDateElement.value,
    endDate: endDateElement.value,
  };
  if(prefs){
    handleOnStartState()
  }
  chrome.runtime.sendMessage({ event: "onStart", prefs });
};
stopButtonElement.onclick = () => {
  chrome.runtime.sendMessage({event:"onStop"})
  handleOnStopState()
};

chrome.storage.local.get(
  ["locationId", "startDate", "endDate", "locations", "isRunning"],
  (result) => {
    const { locationId, startDate, endDate, locations, isRunning } = result;
    setLocations(locations);
    if (locationId) {
      locationIdElement.value = locationId;
    }
    if (startDate) {
      startDateElement.value = startDate;
    }
    if (endDate) {
      endDateElement.value = endDate;
    }
    console.log("loc --> ", locations, isRunning);
  }
);

const setLocations = (locations) => {
 if(locations){
  locations.forEach((loc) => {
    const optionElement = document.createElement("option");
    optionElement.value = loc.id;
    optionElement.innerHTML = loc.name;
    optionElement.setAttribute("data-tz", loc.tzData)
    locationIdElement.appendChild(optionElement);
  });
 }
};
