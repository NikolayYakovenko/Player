import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Howler } from 'howler';

import { PlayerController } from './playerController';

import { SvgIcon } from '../ui/svgIcon/svgIcon';

import pauseIcon from './svg/pauseIcon.svg';
import playIcon from './svg/playIcon.svg';
import prevIcon from './svg/prevIcon.svg';
import nextIcon from './svg/nextIcon.svg';

import './player.css';


export class Player extends React.Component {
    static propTypes = {
        changeTrack: PropTypes.func,
        playTrack: PropTypes.func,
        pauseTrack: PropTypes.func,
        tracks: PropTypes.array,
        track: PropTypes.object,
        isPlaying: PropTypes.bool,
    };

    state = {
        currentTrack: '',
    };

    componentWillMount() {
        this.playlist = this.createPlaylist();
        const index = this.getSelectedTrackId(this.playlist);
        this.setState({
            currentTrack: index,
        });
    }

    componentDidMount() {
        this.player = new PlayerController(this.playlist);
    }

    componentWillUnmount() {
        Howler.unload();
    }

    createPlaylist() {
        const { tracks } = this.props;
        const listOfTracks = [];

        tracks.forEach((item) => {
            listOfTracks.push({
                title: item.trackName,
                file: item.previewUrl,
                howl: null,
                id: item.trackId,
            });
        });

        return listOfTracks;
    }

    getSelectedTrackId(tracks) {
        let index = 0;
        tracks.forEach((item, i) => {
            if (item.id === this.props.track.trackId) {
                index = i;
            }
        });

        return index;
    }

    playButton() {
        const icon = playIcon;
        const btnId = 'playBtn';
        const action = () => {
            this.props.playTrack();
            this.player.play(this.state.currentTrack);
        };

        return (
            <button
                id={btnId}
                className={cs('playerButton', {
                    buttonHidden: this.props.isPlaying,
                })}
                onClick={action}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={icon}
                />
            </button>
        );
    }

    pauseButton() {
        const icon = pauseIcon;
        const btnId = 'pauseBtn';
        const action = () => {
            this.props.pauseTrack();
            this.player.pause();
        };

        return (
            <button
                id={btnId}
                className={cs('playerButton', {
                    buttonHidden: !this.props.isPlaying,
                })}
                onClick={action}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={icon}
                />
            </button>
        );
    }

    prevButton() {
        const { currentTrack } = this.state;
        const lastTrack = this.playlist.length - 1;
        const index = (currentTrack === 0) ? lastTrack : currentTrack - 1;

        const action = () => {
            this.setState({
                currentTrack: index,
            });
            this.props.changeTrack('prev');
            this.player.skip('prev');
        };

        return (
            <button
                id='prevBtn'
                className='playerButton playerButtonSmall'
                onClick={action}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={prevIcon}
                />
            </button>
        );
    }

    nextButton() {
        const { currentTrack } = this.state;
        const lastTrack = this.playlist.length - 1;
        const index = (currentTrack === lastTrack) ? 0 : currentTrack + 1;

        const action = () => {
            this.setState({
                currentTrack: index,
            });
            this.props.changeTrack('next');
            this.player.skip('next');
        };

        return (
            <button
                id='prevBtn'
                className='playerButton playerButtonSmall'
                onClick={action}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={nextIcon}
                />
            </button>
        );
    }

    render() {
        const { currentTrack } = this.state;
        const { title } = this.playlist[currentTrack];

        return (
            <div className='playerWrapper'>
                <div className='trackInfoWrapper'>
                    <p><b id='timer'>0:00</b></p>
                    <p className='trackInfoName' title={title}>
                        <b id='track'>
                            {`${currentTrack + 1}. ${title}`}
                        </b>
                    </p>
                    <p><b id='duration'>0:00</b></p>
                </div>
                <div className='player'>
                    {this.prevButton()}
                    {this.playButton()}
                    {this.pauseButton()}
                    {this.nextButton()}
                </div>
            </div>
        );
    }
}
