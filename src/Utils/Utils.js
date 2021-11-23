export const roundTo2DecimalPoint = value => Math.round((value + Number.EPSILON) * 100) / 100;

export function timeNow() {
  let today = new Date();

  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
    return dateTime;
  }
  
  export function timeShow(prop) {
    let today = new Date(prop);
  
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let time = (today.getHours()+4) + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
      return dateTime;
    }