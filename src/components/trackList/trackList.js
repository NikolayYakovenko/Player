import React from 'react';
import { Track } from '../track/track';
import { SEARCH_URL } from '../../config/api';

import './trackList.css';


export class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            count: '',
        };
    }

    componentDidMount() {
        this.loadTrack().then((response) => {
            const { resultCount, results } = response;
            this.setState({
                tracks: results,
                count: resultCount,
            });
        });
    }

    async loadTrack() {
        const opt = {
            method: 'GET',
            data: this.state,
        };
        const url = `${SEARCH_URL}?term=jack+johnson&limit=25`;
        try {
            const q = await fetch(url, opt);
            return q.json();
        } catch (error) {
            console.error(error);
        }
        return {};
    }

    render() {
        const { tracks, count } = this.state;
        return (
            <div className='wrapper'>
                <h1>
                    Here is our track list
                    {count ?
                        <span>&nbsp;({count})</span>
                        : null
                    }
                </h1>
                <ul>
                    {tracks.map((track) => {
                        return <Track key={track.trackId} trackInfo={track} />;
                    })}
                </ul>
            </div>
        );
    }
}
