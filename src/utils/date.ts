const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDate = (unixEpochMs: number) => {
  var d = new Date(unixEpochMs);
  return (d.getDate() + ' ' + (months[d.getMonth()]) + ', ' + d.getFullYear());
}
export const getTime = (unixEpochMs: number) => {
  var d = new Date(unixEpochMs);
  return d.toLocaleTimeString(undefined, { timeStyle: "short", hour12: true }).replace("pm", "PM").replace("am", "AM")
}
let shortTimeZone: string;
export const getShortTimezone = () => {
  if (!shortTimeZone) {
    shortTimeZone = new Date().toLocaleTimeString('en-us', { timeZoneName: "short" }).split(' ')[2];
  }
  return shortTimeZone;
}