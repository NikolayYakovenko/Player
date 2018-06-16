import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playerActions } from '../../actions';

import { TrackList } from './trackList';


function mapStateToProps(state) {
    return {
        fetching: state.list.fetching,
        tracks: state.list.tracks,
        count: state.list.count,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

export const TrackListContainer = connect(mapStateToProps, mapDispatchToProps)(TrackList);
