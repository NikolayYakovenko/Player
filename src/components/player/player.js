import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

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
    }

    componentDidMount() {
        const { tracks } = this.props;
        const listOfTracks = [];

        tracks.forEach((item) => {
            listOfTracks.push({
                title: item.artistName,
                file: item.previewUrl,
                howl: null,
                id: item.trackId,
            });
        });

        let index = 0;
        listOfTracks.forEach((item, i) => {
            if (item.id === this.props.track.trackId) {
                index = i;
            }
        });

        // Setup the new Howl.
        const player = new PlayerController(listOfTracks);

        const play = document.getElementById('playBtn');
        const pause = document.getElementById('pauseBtn');
        const prev = document.getElementById('prevBtn');
        const next = document.getElementById('nextBtn');

        // Bind our player controls.
        play.addEventListener('click', () => player.play(index));
        pause.addEventListener('click', () => player.pause());
        prev.addEventListener('click', () => player.skip('prev'));
        next.addEventListener('click', () => player.skip('next'));
    }

    playButton() {
        const icon = playIcon;
        const action = this.props.playTrack;
        const btnId = 'playBtn';

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
        const action = this.props.pauseTrack;
        const btnId = 'pauseBtn';

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

    render() {
        return (
            <div className='playerWrapper'>
                <button
                    id='prevBtn'
                    className='playerButton playerButtonSmall'
                    onClick={() => this.props.changeTrack('prev')}
                    type='button'
                >
                    <SvgIcon
                        className='playerControl'
                        glyph={prevIcon}
                    />
                </button>
                {this.playButton()}
                {this.pauseButton()}
                <button
                    id='nextBtn'
                    className='playerButton playerButtonSmall'
                    onClick={() => this.props.changeTrack('next')}
                    type='button'
                >
                    <SvgIcon
                        className='playerControl'
                        glyph={nextIcon}
                    />
                </button>
                <div>
                    Timer:
                    <b id='timer' />

                    <br />
                    Duration:
                    <b id='duration' />

                    <br />
                    Track:
                    <b id='track' />
                </div>
            </div>
        );
    }
}

