import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playerActions } from '../../actions';

import { TrackInfo } from './trackInfo';


function mapStateToProps(state) {
    return {
        tracks: state.list.tracks,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

export const TrackInfoContainer = connect(mapStateToProps, mapDispatchToProps)(TrackInfo);
