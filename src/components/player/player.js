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
        tracks: PropTypes.array,
    }

    render() {
        console.log(this.props.tracks);
        return (
            <div className='playerWrapper'>
                <SvgIcon className='playerControl playerControlSmall' glyph={prevIcon} />
                <SvgIcon className='playerControl' glyph={playIcon} />
                <SvgIcon className='playerControl' glyph={pauseIcon} />
                <SvgIcon className='playerControl playerControlSmall' glyph={nextIcon} />
            </div>
        );
    }
}

