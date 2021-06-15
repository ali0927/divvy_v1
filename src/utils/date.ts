const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDate = (unixEpoch: number) => {
  var d = new Date(unixEpoch);
  return (d.getDate() + ' ' + (months[d.getMonth()]) + ', ' + d.getFullYear());
}
export const getTime = (unixEpoch: number) => {
  var d = new Date(unixEpoch);
  return ((d.getHours() < 10 ? "0" : "") + d.getHours() + ':' + d.getMinutes());
}