export const roundTo2DecimalPoint = value => Math.round((value + Number.EPSILON) * 100) / 100;

export function setTimeSent() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let dateTime = currentDate.getDate() + "-"
      + (currentDate.getMonth() + 1) + "-"
      + currentDate.getFullYear() + " "
      + hours + ":"
      + minutes + " "
      + ampm;
    return dateTime;
  }