import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playerActions } from '../../actions';

import { FavList } from './favList';


function mapStateToProps(state) {
    return {
        favourites: state.favouritesList.favourites,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

export const FavListContainer = connect(mapStateToProps, mapDispatchToProps)(FavList);
