import React from 'react';
import PropTypes from 'prop-types';

import { Track } from '../track/track';

import { Navigation } from '../ui/navigation/navigation';


export class FavList extends React.Component {
    static propTypes = {
        favourites: PropTypes.array,
    }

    renderList() {
        const { favourites } = this.props;
        return (
            favourites && favourites.length ?
                <ul>
                    <li className='listHeader' key='listHeader'>
                        <div className='trackItem'>
                            <b>Title</b>
                        </div>
                        <div
                            className='itemSmall'
                            role='none'
                        >
                            <b>Genre</b>
                        </div>
                        <div
                            className='itemSmall'
                            role='none'
                        >
                            <b>Duration</b>
                        </div>
                        <div
                            className='itemSmall'
                            role='none'
                        >
                            <b>Price</b>
                        </div>
                    </li>
                    {favourites.map((track) => {
                        return <Track key={track.trackId} trackInfo={track} />;
                    })}
                </ul>
                :
                <div className='noResults'>You did not add any song to favourites</div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                {this.renderList()}
            </React.Fragment>
        );
    }
}
