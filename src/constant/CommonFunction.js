export function extractTime(datetimeString) {
    // Create a Date object from the string
    const date = new Date(datetimeString);

    // Extract hours, minutes, and seconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Format the time as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
}