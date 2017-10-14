export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT';
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT';

export function getComments ({ comments }) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment ({ data }) {
  return {
    type: ADD_COMMENT,
    data
  }
}