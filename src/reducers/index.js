import { combineReducers } from 'redux';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST
} from '../posts/actions';

function posts (state = [], action) {
  switch (action.type) {
    case GET_POSTS :
      return action.posts;
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