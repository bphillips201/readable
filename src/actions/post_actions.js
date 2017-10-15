export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export function getPosts ({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function addPost ({ data }) {
  return {
    type: ADD_POST,
    data
  }
}

export function votePost ({ post }) {
  return {
    type: VOTE_POST,
    post
  }
}