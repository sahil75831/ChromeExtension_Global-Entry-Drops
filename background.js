// const data = {
//     "event" :"onStop/onStart",
//     "prefs" : {
//         // data from popup.js
//     }

// }

chrome.runtime.onMessage.addListener((data) => {
    const {event, prefs} = data
  switch (event) {
    case "onStop":
      handleOnstop();
      break;
    case "onStart":
      handleOnStart(prefs);
      break;
    default:
      break;
  }
});
const handleOnStart = (prefs) => {
  console.log("onStart in background");
  chrome.storage.local.set(prefs)
};

const handleOnstop = () => {
    console.log("onStop in background", prefs);
};
