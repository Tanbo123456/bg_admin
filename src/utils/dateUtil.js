export default function getDate(time) {
    let date = new Date(time)
    if (time) {
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '  ' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
    
}