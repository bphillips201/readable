import { combineReducers } from 'redux';
import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST
} from './actions';

function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POST :
      return state;
    case EDIT_POST :
      return state;
    case DELETE_POST :
      return state;
    case VOTE_UP_POST :
      return state;
    case VOTE_DOWN_POST :
      return state;
    default :
      return state;
  }
}

export default combineReducers({
  posts
})