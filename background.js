// const data = {
//     "event" :"onStop/onStart",
//     "prefs" : {
//         // data from popup.js
//     }

import fetchData from "./api/fetchLocations.js";
import { fetchOpenSlots } from "./api/fetchOpenSlots.js";

let cachedPrefs = {}
// }
chrome.runtime.onInstalled.addListener(async (detail) => {
  // console.log("on installed ", detail.reason)
  await fetchData();
});

chrome.runtime.onMessage.addListener((data) => {
  const { event, prefs } = data;
  switch (event) {
    case "onStop":
      handleOnstop();
      break;
    case "onStart":
      handleOnStart(prefs);
      createAlarms();
      break;
    default:
      break;
  }
});
const handleOnStart = (prefs) => {
  console.log("onStart in background");
  chrome.storage.local.set(prefs);
  cachedPrefs = {...prefs}
  setRunningStatus(true)

};

const handleOnstop = () => {
  console.log("onStop in background");
  stopAlarm()
  setRunningStatus(false)
  cachedPrefs = {}
};

const setRunningStatus = (isRunning) => {
  chrome.storage.local.set({isRunning})
}

const ALARM_JOB_NAME = "DROP_ALARM";
const createAlarms = () => {
  chrome.alarms.get(ALARM_JOB_NAME, existingAlarm => {
    if(!existingAlarm){
      chrome.alarms.create(ALARM_JOB_NAME, { periodInMinutes: 1.0 });
    }
  })
};

const stopAlarm = () => {
  chrome.alarms.clearAll()
}
chrome.alarms.onAlarm.addListener(async () => {
  console.log("on alarms create alarm schedule code running...")
  await fetchOpenSlots(cachedPrefs)
})