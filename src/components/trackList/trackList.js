import React from 'react';
import PropTypes from 'prop-types';

import { Track } from '../track/track';
import { AlbumCover } from '../albumCover/albumCover';

import { Input } from '../ui/input/input';
import { Spinner } from '../ui/spinner/spinner';
import { Navigation } from '../ui/navigation/navigation';

import './trackList.css';

const ENTER_KEY = 13;


export class TrackList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.searchInput.addEventListener('keyup', (event) => this.makeSearch(event));
    }

    componentWillUnmount() {
        this.searchInput.removeEventListener('keyup', (event) => this.makeSearch(event));
    }

    makeSearch = (event) => {
        const { searchValue } = this.state;
        const { loadTracks } = this.props;
        const searchNotEmpty = searchValue.length > 0;

        if (event.keyCode === ENTER_KEY && searchNotEmpty) {
            loadTracks(searchValue);
        }
    }

    onSearchValueChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }

    renderAlbumCover() {
        const { tracks } = this.props;
        const cover = tracks.filter((track) => track.wrapperType === 'collection');

        if (cover.length) {
            return (
                <AlbumCover trackInfo={cover[0]} />
            );
        }
        return null;
    }

    renderList() {
        const {
            tracks,
            count,
            makeSort,
            errorMessage,
            loadTracksByAlbum,
        } = this.props;

        if (count) {
            return (
                <ul>
                    {this.renderAlbumCover()}
                    <li className='listHeader' key='listHeader'>
                        <div className='trackItem'>
                            <b className='headerTitle'>Title</b>
                            <b className='sortTracksLabel'>Sort by:</b>
                        </div>
                        <div
                            className='itemSmall sortable'
                            onClick={() => makeSort('primaryGenreName')}
                            role='none'
                        >
                            <b>Genre</b>
                        </div>
                        <div
                            className='itemSmall sortable'
                            onClick={() => makeSort('trackTimeMillis')}
                            role='none'
                        >
                            <b>Duration</b>
                        </div>
                        <div
                            className='itemSmall sortable'
                            onClick={() => makeSort('trackPrice')}
                            role='none'
                        >
                            <b>Price</b>
                        </div>
                    </li>
                    {tracks.map((track) => {
                        if (track.wrapperType !== 'collection') {
                            return (
                                <Track
                                    key={track.trackId}
                                    trackInfo={track}
                                    loadTracksByAlbum={loadTracksByAlbum}
                                />
                            );
                        }
                        return null;
                    })}
                </ul>
            );
        } if (errorMessage) {
            return (
                <div className='noResults'>{errorMessage}</div>
            );
        }

        return (
            <div className='noResults'>Nothing was found</div>
        );
    }

    render() {
        const { fetching } = this.props;
        const { searchValue } = this.state;

        return (
            <>
                <Navigation />
                <Input
                    refFn={(input) => { this.searchInput = input; }}
                    className='searchFieldWrapper'
                    value={searchValue}
                    onChange={this.onSearchValueChange}
                    placeholder='Enter song or artist'
                />
                {fetching
                    ? (
                        <div className='spinnerWrapper'>
                            <Spinner />
                        </div>
                    )
                    : this.renderList()}
            </>
        );
    }
}

TrackList.propTypes = {
    loadTracks: PropTypes.func.isRequired,
    loadTracksByAlbum: PropTypes.func.isRequired,
    makeSort: PropTypes.func.isRequired,
    tracks: PropTypes.array,
    fetching: PropTypes.bool,
    count: PropTypes.number,
    errorMessage: PropTypes.string,
};
