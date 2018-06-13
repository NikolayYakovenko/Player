import React from 'react';
import { Track } from '../track/track';

export const TrackList = () => {
    const tracks = [
        {
            name: 'first',
            id: 1,
        },
        {
            name: 'second',
            id: 2,
        },
        {
            name: 'third',
            id: 3,
        },
        {
            name: 'fourth',
            id: 4,
        },
    ];

    return (
        <div>
            Here is our track list
            <ul>
                {tracks.map((track) => {
                    return <Track name={track.name} key={track.id} />;
                })}
            </ul>
        </div>
    );
};
