import React from 'react';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { capitalize } from '../utils/helpers';

class PostList extends React.Component {
  render() {
    return(
      <ul className="post-list">
        {this.props.posts.map((post) => (
          <li key={post.id} className="post">
            <div className="post-ranking">
              <button><FaCaretUp/></button>
              <span className="post-ranking-value">{post.voteScore}</span>
              <button><FaCaretDown/></button>
            </div>
            <h4><a href="#">{capitalize(post.category)}</a></h4>
            <h3><a href="#">{post.title}</a></h3>
            <div className="post-meta">
              <span className="post-author">{post.author}</span>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default PostList;