import React from 'react';
import PropTypes from 'prop-types';

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
        isPlaying: PropTypes.bool,
    }

    playPauseButton() {
        let icon = playIcon;
        let action = this.props.playTrack;

        if (this.props.isPlaying) {
            icon = pauseIcon;
            action = this.props.pauseTrack;
        }

        return (
            <button className='playerButton' onClick={action} type='button'>
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
                    className='playerButton playerButtonSmall'
                    onClick={() => this.props.changeTrack('prev')}
                    type='button'
                >
                    <SvgIcon
                        className='playerControl'
                        glyph={prevIcon}
                    />
                </button>
                {this.playPauseButton()}
                <button
                    className='playerButton playerButtonSmall'
                    onClick={() => this.props.changeTrack('next')}
                    type='button'
                >
                    <SvgIcon
                        className='playerControl'
                        glyph={nextIcon}
                    />
                </button>
            </div>
        );
    }
}

