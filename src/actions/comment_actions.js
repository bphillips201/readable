export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

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

export function voteComment ({ comment }) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}