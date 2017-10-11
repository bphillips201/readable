import React from 'react';

class PostList extends React.Component {
  render() {

    return(
      <li className="post">
        <span className="post-score">5</span>
        <h4><a href="#">React</a></h4>
        <h3><a href="#">5 Reasons Why React is the Best JS Framework</a></h3>
        <div className="post-meta">
          <span className="post-author">Brian Phillips</span> · <span className="post-comment-count">5 Comments</span>
        </div>
      </li>
    )
  }
}

export default PostList;