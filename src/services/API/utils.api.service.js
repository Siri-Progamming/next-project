export const LOGGER = (log) => {
    const now = formatDate(new Date());
    console.log(now + ' - ' + log);
}

const formatDate = (date) => {
    let day = date.getDate();
    if(day<10){
        day='0'+day;
    }
    let month = date.getMonth() + 1;
    if(month<10){
        month='0'+month;
    }
    let year = date.getFullYear();
    let hours = date.getHours();
    if(hours<10){
        hours='0'+hours;
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes='0'+minutes;
    }
    let seconds = date.getSeconds();
    if(seconds<10){
        seconds='0'+seconds;
    }
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
