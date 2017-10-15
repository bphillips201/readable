import { combineReducers } from 'redux';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from '../actions/post_actions';
import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions/comment_actions';

function posts (state = [], action) {
  switch (action.type) {
    case GET_POSTS :
      return action.posts;
    case ADD_POST :
      const { data } = action;
      return [
        ...state,
        {
          id: data.id,
          timestamp: data.timestamp,
          title: data.title,
          author: data.author,
          body: data.body,
          category: data.category,
          voteScore: data.voteScore,
          deleted: data.deleted
        }
      ]
    case EDIT_POST :
      return state;
    case DELETE_POST :
      return state;
    case VOTE_POST :
      return state.map(post => 
        (post.id === action.post.id) ? {
          ...post,
          voteScore: action.post.voteScore
        } : post
      )
    default :
      return state;
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case GET_COMMENTS :
      return action.comments;
    case ADD_COMMENT :
      const { data } = action;
      return [
        ...state,
        {
          id: data.id,
          parentId: data.parentId,
          timestamp: data.timestamp,
          author: data.author,
          body: data.body,
          voteScore: data.voteScore,
          deleted: data.deleted,
          parentDeleted: data.parentDeleted
        }
      ]
    case EDIT_COMMENT :
      return state;
    case DELETE_COMMENT :
      return state;
    case VOTE_COMMENT :
      return state.map(comment => 
        (comment.id === action.comment.id) ? {
          ...comment,
          voteScore: action.comment.voteScore
        } : comment
      )
    default :
      return state;
  }
}

export default combineReducers({
  posts,
  comments
})