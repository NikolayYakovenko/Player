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
        pauseTrack,
        updateCurrentTrack,
        disabled,
    } = props;
    const selected = playlist.find(track => track.id === id);
    const isPlaying = selected && selected.isPlaying;

    const buttonAction = () => {
        if (isPlaying) {
            pauseTrack(id);
        } else {
            updateCurrentTrack(id);
            runTrack(id);
        }
    };

    return (
        <button
            id={id}
            className='playerButton'
            onClick={buttonAction}
            disabled={disabled}
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
    pauseTrack: PropTypes.func,
    runTrack: PropTypes.func,
    updateCurrentTrack: PropTypes.func,
    id: PropTypes.number,
    playlist: PropTypes.array,
    disabled: PropTypes.bool,
};
