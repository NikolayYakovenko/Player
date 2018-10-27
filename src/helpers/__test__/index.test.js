import fetchMock from 'fetch-mock';

import {
    formatTime,
    getTrackDuration,
    sortList,
    requestData,
    getReleaseDate,
} from '../index';


test('convert number to string depending on its value', () => {
    expect(formatTime(237)).toBe('237');
    expect(formatTime(45)).toBe('45');
    expect(formatTime(10)).toBe('10');
    expect(formatTime(5)).toBe('05');
    expect(formatTime(0)).toBe('00');
});


test('format time in ms to get duration', () => {
    expect(getTrackDuration(368858000)).toBe('102:27:38');
    expect(getTrackDuration(14400000)).toBe('04:00:00');
    expect(getTrackDuration(4525000)).toBe('01:15:25');
    expect(getTrackDuration(150000)).toBe('00:02:30');
    expect(getTrackDuration(120000)).toBe('00:02:00');
    expect(getTrackDuration(0)).toBe('00:00:00');
});

test('parse and format date', () => {
    expect(getReleaseDate('2015-10-23T07:00:00Z')).toBe('October 23, 2015');
    expect(getReleaseDate('')).toBe('Invalid Date');
});

describe('check async func for requests', () => {
    beforeEach(() => fetchMock.reset());
    const url = 'example.com';

    test('async action succses', async () => {
        fetchMock.get(url, { id: 123 });
        expect.assertions(1);
        const response = await requestData(url);
        expect(response.id).toBe(123);
    });

    test('async action fails with error', async () => {
        fetchMock.mock(url, () => { throw new Error('error'); });
        expect.assertions(1);
        try {
            await requestData(url);
        } catch (error) {
            expect(error.message).toMatch('error');
        }
        fetchMock.reset();
    });

    test('async action fails with bad request', async () => {
        fetchMock.mock(url, 400);
        const data = await requestData(url);
        expect(data).toMatchObject({});
        fetchMock.reset();
    });
});


describe('check sort func for array', () => {
    test('sort array by time DESC', () => {
        const array = [
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 200000,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'When We Were Young',
                trackPrice: 1.55,
                trackTimeMillis: 290500,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 250000,
                primaryGenreName: 'Rock',
            },
        ];
        const sortedByTime = [
            {
                trackPrice: 1.55,
                trackName: 'When We Were Young',
                trackTimeMillis: 290500,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 250000,
                primaryGenreName: 'Rock',
            },
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 200000,
                primaryGenreName: 'Pop',
            },
        ];

        expect(
            sortList(array, 'trackTimeMillis', true))
            .toMatchObject(sortedByTime);
    });

    test('sort array by price field ASC', () => {
        const array = [
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'When We Were Young',
                trackPrice: 1.55,
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
        ];
        const sortedByPrice = [
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
            {
                trackPrice: 1.55,
                trackName: 'When We Were Young',
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
        ];

        expect(
            sortList(array, 'trackPrice', false))
            .toMatchObject(sortedByPrice);
    });

    test('sort array by genre field ACS', () => {
        const array = [
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'When We Were Young',
                trackPrice: 1.55,
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
        ];

        const sortedByGenre = [
            {
                trackPrice: 1.55,
                trackName: 'When We Were Young',
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
        ];

        expect(
            sortList(array, 'primaryGenreName', true))
            .toMatchObject(sortedByGenre);
    });

    test('sort array by genre field DESC', () => {
        const array = [
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackName: 'When We Were Young',
                trackPrice: 1.55,
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
        ];

        const sortedByGenre = [
            {
                trackName: 'Rolling in the Deep',
                trackPrice: 1.29,
                trackTimeMillis: 228293,
                primaryGenreName: 'Rock',
            },
            {
                trackName: 'Someone Like You',
                trackPrice: 1.1,
                trackTimeMillis: 228293,
                primaryGenreName: 'Pop',
            },
            {
                trackPrice: 1.55,
                trackName: 'When We Were Young',
                trackTimeMillis: 290900,
                primaryGenreName: 'Classic',
            },
        ];

        expect(
            sortList(array, 'primaryGenreName', false))
            .toMatchObject(sortedByGenre);
    });
});