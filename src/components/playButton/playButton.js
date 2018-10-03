import React from 'react';
import PropTypes from 'prop-types';

import { SvgIcon } from '../ui/svgIcon/svgIcon';

import playIcon from '../player/svg/playIcon.svg';
import pauseIcon from '../player/svg/pauseIcon.svg';


export const PlayButton = (props) => {
    const {
        id,
        runTrack,
        playlist,
        playTrack,
        pauseTrack,
        updateCurrentTrack,
    } = props;
    const selected = playlist.find(track => track.id === id);
    const isPlaying = selected && selected.isPlaying;

    const buttonAction = () => {
        if (isPlaying) {
            selected.howl.pause();
            pauseTrack(id);
        } else {
            runTrack(id);
            updateCurrentTrack(id);
            playTrack(id);
        }
    };

    return (
        <button
            id={id}
            className='playerButton playerButtonSmall'
            onClick={buttonAction}
            type='button'
        >
            <SvgIcon
                className='playerControl'
                glyph={isPlaying ? pauseIcon : playIcon}
            />
        </button>
    );
};

PlayButton.propTypes = {
    playTrack: PropTypes.func,
    pauseTrack: PropTypes.func,
    runTrack: PropTypes.func,
    updateCurrentTrack: PropTypes.func,
    id: PropTypes.number,
    playlist: PropTypes.array,
};
