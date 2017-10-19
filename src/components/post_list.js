import '../styles/posts.css';
import React from 'react';
import Post from './post';

import { connect } from 'react-redux';

class PostList extends React.Component {

  render() {
    return(
      <ul className="post-list">
        {this.props.posts
          .sort((a, b) => a.voteScore < b.voteScore)
          .filter((post) => post.deleted !== true)
          .map((post) => (
            <Post post={post} key={post.id}/>
        ))}
      </ul>
    )
  }
}

export default connect(null)(PostList);