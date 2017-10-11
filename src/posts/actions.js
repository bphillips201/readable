export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_UP_POST = 'VOTE_UP_POST';
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST';

export function addPost ({ id, title, body, author, category }) {
  return {
    type: ADD_POST,
    id,
    title,
    body,
    author,
    category,
    timestamp: Date.Now()
  }
}