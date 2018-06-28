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
import volumeIcon from './svg/volumeIcon.svg';

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

        const volumeSlider = document.getElementById('volumeSlider');
        this.volumeControl = document.getElementById('volumeControl');
        const volumeBarEmpty = document.getElementById('volumeBarEmpty');

        volumeBarEmpty.addEventListener('click', (event) => {
            const per = event.layerX / parseFloat(volumeBarEmpty.scrollWidth);
            this.player.volume(per);
        });
        volumeSlider.addEventListener('mousedown', () => {
            window.sliderDown = true;
        });
        this.volumeControl.addEventListener('mouseup', () => {
            window.sliderDown = false;
        });
        this.volumeControl.addEventListener('touchend', () => {
            window.sliderDown = false;
        });

        const move = (event) => {
            if (window.sliderDown) {
                const x = event.clientX || event.touches[0].clientX;

                const { left } = volumeBarEmpty.getBoundingClientRect();
                const { right } = volumeBarEmpty.getBoundingClientRect();
                const abs = right - left;
                const layerX = x - left;

                let per = layerX / abs;
                per = Math.min(1, per);
                this.player.volume(per);
            }
        };
        this.volumeControl.addEventListener('mousemove', move);
        this.volumeControl.addEventListener('touchmove', move);

        document.addEventListener('click', (event) => {
            this.hideVolumeButtonOnOutsideClick(event);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', (event) => {
            this.hideVolumeButtonOnOutsideClick(event);
        });

        this.props.pauseTrack();
        Howler.unload();
    }

    hideVolumeButtonOnOutsideClick(event) {
        if (this.volBtn &&
            !this.volBtn.contains(event.target) &&
            !this.volumeControl.contains(event.target)
        ) {
            this.player.hideVolume();
        }
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

    volumeButton() {
        return (
            <button
                className='playerButton playerButtonSmall'
                onClick={() => this.player.toggleVolume()}
                type='button'
                ref={(button) => { this.volBtn = button; }}
            >
                <SvgIcon
                    className='playerControl'
                    glyph={volumeIcon}
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
                {this.volumeButton()}
                <div id='volumeControl' className='volumeControl volumeFadeout'>
                    <div id='volumeBarFull' className='volumeBar volumeBarFull'>
                        <button id='volumeSlider' className='volumeSlider' />
                    </div>
                    <div id='volumeBarEmpty' className='volumeBar volumeBarEmpty' />
                </div>
            </div>
        );
    }
}
