import '../styles/posts.css';
import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { capitalize } from '../utils/helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePost } from '../actions/post_actions';

class PostList extends React.Component {

  votePost = (postId, option) => {
    ReadableAPI
      .votePost(postId, option)
      .then((post) => {
        this.props.dispatch(votePost({post}));
      });
  }

  render() {
    return(
      <ul className="post-list">
        {this.props.posts
          .sort((a, b) => a.voteScore < b.voteScore)
          .filter((post) => post.deleted !== true)
          .map((post) => (
          <li key={post.id} className="post">
            <div className="post-ranking">
              <button className="ranking-button" onClick={() => this.votePost(post.id, 'upVote')}><FaCaretUp/></button>
              <div className="post-ranking-value">{post.voteScore}</div>
              <button className="ranking-button" onClick={() => this.votePost(post.id, 'downVote')}><FaCaretDown/></button>
            </div>
            <div className="post-content">
              <h4><Link to={`/${post.category}`}>{capitalize(post.category)}</Link></h4>
              <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
              <div className="post-meta">
                <span className="post-author">by {post.author}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(null)(PostList);