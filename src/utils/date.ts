const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDate = (unixEpoch: number) => {
  var d = new Date(unixEpoch);
  return (d.getDate() + ' ' + (months[d.getMonth()]) + ', ' + d.getFullYear());
}
export const getTime = (unixEpoch: number) => {
  var d = new Date(unixEpoch);
  return d.toLocaleTimeString(undefined, { timeStyle: "short" }).replace("AM", "a.m.").replace("PM", "p.m.");
}
let shortTimeZone: string;
export const getShortTimezone = () => {
  if (!shortTimeZone) {
    shortTimeZone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
  }
  return shortTimeZone;
}