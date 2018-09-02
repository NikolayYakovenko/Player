import React from 'react';
import PropTypes from 'prop-types';
import { Howl, Howler } from 'howler';
import cs from 'classnames';

import { SvgIcon } from '../ui/svgIcon/svgIcon';

import pauseIcon from './svg/pauseIcon.svg';
import playIcon from './svg/playIcon.svg';
import prevIcon from './svg/prevIcon.svg';
import nextIcon from './svg/nextIcon.svg';
import volumeIcon from './svg/volumeIcon.svg';

import './player.css';


export class ReactPlayer extends React.Component {
    static propTypes = {
        changeTrack: PropTypes.func,
        playTrack: PropTypes.func,
        pauseTrack: PropTypes.func,
        tracks: PropTypes.array,
        track: PropTypes.object,
        isPlaying: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.playerTimerRef = React.createRef();
        this.volumeButtonRef = React.createRef();
        this.volumeSliderRef = React.createRef();
        this.volumeControlRef = React.createRef();
        this.volumeBarEmptyRef = React.createRef();
    }

    state = {
        playlist: [],
        index: 0,
        duration: '0:00',
        volumeBarWidth: '100%',
        trackTitle: '',
        volumeControlVisible: false,
    };

    componentWillMount() {
        this.playlist = this.createPlaylist();
        const trackIndex = this.getSelectedTrackId(this.playlist);
        this.setState({
            playlist: this.createPlaylist(),
            index: trackIndex,
        });
    }

    componentDidMount() {
        const volumeSliderRef = this.volumeSliderRef.current;
        const volumeControlRef = this.volumeControlRef.current;
        const volumeBarEmptyRef = this.volumeBarEmptyRef.current;

        volumeBarEmptyRef.addEventListener('click', (event) => {
            const per = event.layerX / parseFloat(volumeBarEmptyRef.scrollWidth);
            this.volume(per);
        });

        volumeSliderRef.addEventListener('mousedown', () => {
            window.sliderDown = true;
        });
        volumeControlRef.addEventListener('mouseup', () => {
            window.sliderDown = false;
        });
        volumeControlRef.addEventListener('touchend', () => {
            window.sliderDown = false;
        });

        volumeControlRef.addEventListener('mousemove', (event) => {
            this.changeVolumeOnSliderMove(event);
        });
        volumeControlRef.addEventListener('touchmove', (event) => {
            this.changeVolumeOnSliderMove(event);
        });

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

    play(trackIndex) {
        let sound;
        const self = this;
        const data = this.state.playlist[trackIndex];

        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
            sound = data.howl;
        } else {
            sound = new Howl({
                src: [data.file],
                // Force to HTML5 so that the audio can stream in (best for large files).
                html5: true,
                preload: true,
                onplay: () => {
                    self.setState({
                        duration: self.formatTime(Math.round(sound.duration())),
                    });
                    requestAnimationFrame(self.step.bind(self));
                },
                onend: () => {
                    self.skip('next');
                },
            });
            data.howl = sound;
        }

        // Begin playing the sound.
        sound.play();
        this.props.playTrack();

        // Update the track display.
        this.setState({
            trackTitle: `${trackIndex + 1}. ${data.title}`,
            index: trackIndex,
        });
    }

    pause() {
        // Get the Howl we want to manipulate.
        const sound = this.state.playlist[this.state.index].howl;

        // Puase the sound.
        sound.pause();
        this.props.pauseTrack();
    }

    /**
     * Skip to the next or previous track.
     * @param  {String} direction 'next' or 'prev'.
     */
    skip(direction) {
        const { playlist, index } = this.state;
        let newIndex = 0;

        // Get the next track based on the direction of the track.
        if (direction === 'prev') {
            newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = playlist.length - 1;
            }
        } else {
            newIndex = index + 1;
            if (newIndex >= playlist.length) {
                newIndex = 0;
            }
        }

        this.skipTo(newIndex);
        this.props.changeTrack(direction);
    }

    /**
     * Skip to a specific track based on its playlist index.
     * @param  {Number} newIndex Index in the playlist.
     */
    skipTo(newIndex) {
        const { playlist, index } = this.state;

        // Stop the current track.
        if (playlist[index].howl) {
            playlist[index].howl.stop();
        }

        // Play the new track.
        this.play(newIndex);
    }

    step() {
        const { playlist, index } = this.state;
        const self = this;

        // Get the Howl we want to manipulate.
        const sound = playlist[index].howl;

        if (sound && sound.playing()) {
            // Determine our current seek position.
            const seek = sound.seek() || 0;
            this.playerTimerRef.current.innerHTML = this.formatTime(Math.round(seek));
            requestAnimationFrame(self.step.bind(self));
        }
    }

    volume(val) {
        // Update the global volume (affecting all Howls).
        Howler.volume(val);

        const barWidth = Math.round(val * 100);
        this.setState({
            volumeBarWidth: `${barWidth}%`,
        });
    }

    toggleVolume() {
        this.setState({
            volumeControlVisible: !this.state.volumeControlVisible,
        });
    }

    hideVolume() {
        if (this.state.volumeControlVisible) {
            this.setState({
                volumeControlVisible: false,
            });
        }
    }

    // TODO: Move to helpers
    formatTime(secs) {
        const minutes = Math.floor(secs / 60) || 0;
        const seconds = (secs - (minutes * 60)) || 0;

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // TODO: Move to helpers
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

    // TODO: Move to helpers
    getSelectedTrackId(tracks) {
        let index = 0;
        tracks.forEach((item, i) => {
            if (item.id === this.props.track.trackId) {
                index = i;
            }
        });

        return index;
    }

    getVolumeValueOnSliderMove(event) {
        const volumeBarEmpty = this.volumeBarEmptyRef.current;
        const x = event.clientX || event.touches[0].clientX;

        const { width, left } = volumeBarEmpty.getBoundingClientRect();

        // normalized to bar width absolute value
        const absValue = (x - left) > 0 ? (x - left) : 0;
        let volumeValue = 0;

        volumeValue = Math.min(1, absValue / width);
        return volumeValue;
    }

    changeVolumeOnSliderMove(event) {
        if (window.sliderDown) {
            this.volume(this.getVolumeValueOnSliderMove(event));
        }
    }

    hideVolumeButtonOnOutsideClick(event) {
        const volumeBtn = this.volumeButtonRef.current;
        const volumeControl = this.volumeControlRef.current;
        const volumeBtnVisible = this.state.volumeControlVisible && volumeBtn;

        if (volumeBtnVisible &&
            !volumeBtn.contains(event.target) &&
            !volumeControl.contains(event.target)
        ) {
            this.hideVolume();
        }
    }

    playButton() {
        return (
            <button
                className={cs('playerButton', {
                    buttonHidden: this.props.isPlaying,
                })}
                onClick={() => this.play(this.state.index)}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={playIcon}
                />
            </button>
        );
    }

    pauseButton() {
        return (
            <button
                className={cs('playerButton', {
                    buttonHidden: !this.props.isPlaying,
                })}
                onClick={() => this.pause()}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={pauseIcon}
                />
            </button>
        );
    }

    prevButton() {
        return (
            <button
                className='playerButton playerButtonSmall'
                onClick={() => this.skip('prev')}
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
        return (
            <button
                className='playerButton playerButtonSmall'
                onClick={() => this.skip('next')}
                type='button'
            >
                <SvgIcon
                    className='playerControl'
                    glyph={nextIcon}
                />
            </button>
        );
    }

    toggleVolumeButton() {
        return (
            <button
                className='playerButton playerButtonSmall'
                onClick={() => this.toggleVolume()}
                type='button'
                ref={this.volumeButtonRef}
            >
                <SvgIcon
                    className='playerControl'
                    glyph={volumeIcon}
                />
            </button>
        );
    }

    volumeControlBar() {
        return (
            <div
                ref={this.volumeControlRef}
                className={cs('volumeControl', {
                    volumeControlVisible: this.state.volumeControlVisible,
                })}
            >
                <div
                    className='volumeBar volumeBarFull'
                    style={{ width: this.state.volumeBarWidth }}
                >
                    <button
                        ref={this.volumeSliderRef}
                        className='volumeSlider'
                    />
                </div>
                <div
                    ref={this.volumeBarEmptyRef}
                    className='volumeBar volumeBarEmpty'
                />
            </div>
        );
    }

    render() {
        return (
            <div className='playerWrapper'>
                <div className='trackInfoWrapper'>
                    <p>
                        <b ref={this.playerTimerRef}>0:00</b>
                    </p>
                    <p className='trackInfoName'>
                        <b>{this.state.trackTitle}</b>
                    </p>
                    <p>
                        <b>{this.state.duration}</b>
                    </p>
                </div>
                <div className='player'>
                    {this.prevButton()}
                    {this.playButton()}
                    {this.pauseButton()}
                    {this.nextButton()}
                </div>
                <div className='volumeWrapper'>
                    {this.toggleVolumeButton()}
                    {this.volumeControlBar()}
                    <div className='volumeValue'>{this.state.volumeBarWidth}</div>
                </div>
            </div>
        );
    }
}
