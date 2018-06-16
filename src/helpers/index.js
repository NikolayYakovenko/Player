function formatTime(value) {
    const result = (value < 10) ? `0${value}` : value;
    return result;
}


export function getTrackDuration(time) {
    let sec = '00';
    let min = '00';
    let hour = '00';

    if (time) {
        const seconds = Math.round(time / 1000);
        hour = seconds % 3600;
        hour = (seconds - hour);

        sec = seconds % 60;
        min = (seconds - hour - sec);

        hour /= 3600;
        min /= 60;

        hour = formatTime(hour);
        min = formatTime(min);
        sec = formatTime(sec);
    }
    return `${hour}:${min}:${sec}`;
}


export async function requestData(url) {
    const opt = {
        method: 'GET',
    };

    try {
        const query = await fetch(url, opt);
        if (query.status === 200) {
            return query.json();
        }
    } catch (error) {
        console.error(error);
    }
    return {};
}
