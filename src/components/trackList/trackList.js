import React from 'react';
import { Track } from '../track/track';
import { SEARCH_URL } from '../../config/api';


export class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            count: '',
        };
    }

    componentDidMount() {
        this.loadTracks().then((response) => {
            const { resultCount, results } = response;
            this.setState({
                tracks: results,
                count: resultCount,
            });
        });
    }

    async loadTracks() {
        const opt = {
            method: 'GET',
        };
        const url = `${SEARCH_URL}?term=beatles&limit=25`;
        try {
            const request = await fetch(url, opt);
            return request.json();
        } catch (error) {
            console.error(error);
        }
        return {};
    }

    renderList() {
        const { tracks, count } = this.state;
        return (
            count ?
                <ul>
                    {tracks.map((track) => {
                        return <Track key={track.trackId} trackInfo={track} />;
                    })}
                </ul>
                :
                <div>Nothing was found.</div>
        );
    }

    render() {
        const { count } = this.state;
        return (
            <React.Fragment>
                <h1>
                    Here is our track list
                    {count ?
                        <span>&nbsp;({count})</span>
                        : null
                    }
                </h1>
                {this.renderList()}
            </React.Fragment>
        );
    }
}
