import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Link } from 'react-router-dom';
import { votePost } from '../actions/post_actions';
import { capitalize } from '../utils/helpers';
import { connect } from 'react-redux';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

class Post extends Component {
  state = {
    commentCount: 0
  }
  
  votePost = (postId, option) => {
    ReadableAPI
      .votePost(postId, option)
      .then((post) => {
        this.props.dispatch(votePost({post}));
      });
  }

  componentDidMount() {
    ReadableAPI.getPostComments(this.props.post.id).then((comments) => {
      this.setState({ 
        commentCount: comments.filter((comment) => comment.deleted !== true && comment.parentDeleted !== true).length 
      });
    });
  }

  render() {
    const { post } = this.props;
    const { commentCount } = this.state;

    return (
      <li className="post">
        <div className="post-ranking">
          <button className="ranking-button" onClick={() => this.votePost(post.id, 'upVote')}><FaCaretUp/></button>
          <div className="post-ranking-value">{post.voteScore}</div>
          <button className="ranking-button" onClick={() => this.votePost(post.id, 'downVote')}><FaCaretDown/></button>
        </div>
        <div className="post-content">
          <h4><Link to={`/${post.category}`}>{capitalize(post.category)}</Link></h4>
          <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
          <div className="post-meta">
            <span className="post-author">by {post.author}</span> • <span className="comment-count">{commentCount} comments</span>
          </div>
        </div>
      </li>
    );
  }
}

export default connect(null)(Post);