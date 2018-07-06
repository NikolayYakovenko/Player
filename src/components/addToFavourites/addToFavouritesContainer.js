import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playerActions } from '../../actions';

import { AddToFavourites } from './addToFavourites';


function mapStateToProps(state, ownProps) {
    return {
        active: state.favouritesList.active,
        track: ownProps.track,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

export const AddToFavouritesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddToFavourites);
