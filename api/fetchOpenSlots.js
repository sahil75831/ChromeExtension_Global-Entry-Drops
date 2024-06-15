import { handleNotifications } from "../lib/handleNotificarions.js";

export const fetchOpenSlots = (result) => {
    console.log("result --> ", result)
  const { locationId, startDate, endDate } = result;

  const APPOINTMENT_URL = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startDate}T00:00:00&endTimestamp=${endDate}T00:00:00`;

  fetch(APPOINTMENT_URL, {
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
        return data.filter(slot => slot.active > 0)
    }).then(data => handleNotifications(result))
    .catch((error) => {
      console.error("There was a problem with the fetch operation: at APPOINTMENT_URL ", error);
    });
};
