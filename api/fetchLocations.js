const LOCATION_URL =
  "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry";

export default function fetchData() {
  fetch(LOCATION_URL, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
      },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
         const filterdLocations = data.map(loc => ({
            id:loc.id,
            name:loc.name,
            shortName:loc.shortName,
            tzData : loc.tzData
         }))
         
         chrome.storage.local.set({locations:filterdLocations})
    }
    )
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
