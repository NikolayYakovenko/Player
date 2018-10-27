export function formatTime(value) {
    const result = (value < 10) ? `0${value}` : `${value}`;
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
        throw new Error(error);
    }
    return {};
}

export function sortList(array, field, isSorted) {
    if (field === 'primaryGenreName') {
        array.sort((a, b) => {
            if (isSorted) {
                return a[field].localeCompare(b[field]);
            }
            return b[field].localeCompare(a[field]);
        });
    } else {
        array.sort((a, b) => {
            if (isSorted) {
                return b[field] - a[field];
            }
            return a[field] - b[field];
        });
    }
    return array;
}


export function getReleaseDate(date) {
    let a = Date.parse(date);
    a = new Date(a);
    return a.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

