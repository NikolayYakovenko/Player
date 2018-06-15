import React from 'react';

import { SEARCH_URL } from '../../config/api';

import { Track } from '../track/track';

import { Input } from '../ui/input/input';
import { Spinner } from '../ui/spinner/spinner';

import './trackList.css';

const ENTER = 13;


export class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            count: '',
            searchValue: '',
            fetching: false,
        };

        this.makeSearch = this.makeSearch.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', event => this.makeSearch(event));
    }

    async loadTracks(value) {
        const opt = {
            method: 'GET',
        };
        const url = `${SEARCH_URL}?term=${value}&limit=25`;
        try {
            this.setState({
                fetching: true,
            });
            const request = await fetch(url, opt);
            return request.json();
        } catch (error) {
            console.error(error);
        }
        return {};
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', event => this.makeSearch(event));
    }

    makeSearch(event) {
        const { searchValue } = this.state;
        const searchNotEmpty = searchValue.length > 0;

        if (event.keyCode === ENTER && searchNotEmpty) {
            this.loadTracks(searchValue)
                .then((response) => {
                    const { resultCount, results } = response;
                    this.setState({
                        tracks: results,
                        count: resultCount,
                        fetching: false,
                    });
                });
        }
    }

    onSearchValueChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
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
                <div className='noResults'>Nothing was found</div>
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
                <Input
                    className='searchFieldWrapper'
                    value={this.state.searchValue}
                    onChange={event => this.onSearchValueChange(event)}
                    placeholder='Enter song or artist'
                />
                {this.state.fetching ?
                    <div className='spinnerWrapper'>
                        <Spinner />
                    </div>
                    :
                    this.renderList()
                }
            </React.Fragment>
        );
    }
}
