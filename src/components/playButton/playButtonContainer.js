import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playerActions } from '../../actions';

import { PlayButton } from './playButton';


function mapStateToProps(state, ownProps) {
    return {
        id: ownProps.id,
        ...state.player,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

export const PlayButtonContainer = connect(mapStateToProps, mapDispatchToProps)(PlayButton);
