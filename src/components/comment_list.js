import React from 'react';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import * as ReadableAPI from '../utils/ReadableAPI';
import { getComments, voteComment, deleteComment } from '../actions/comment_actions';
import { connect } from 'react-redux';

class CommentList extends React.Component {
  state = {
    comments: []
  }

  voteComment = (commentId, option) => {
    ReadableAPI
      .voteComment(commentId, option)
      .then((comment) => {
        this.props.dispatch(voteComment({comment}));
      });
  }

  deleteComment = (commentId) => {
    ReadableAPI.deleteComment(commentId).then((data) => {
      this.props.dispatch(deleteComment(data));
    });
  }
  
  componentDidMount() {
    ReadableAPI.getPostComments(this.props.postId).then((comments) => {
      this.props.dispatch(getComments({comments}))
    });
  }

  render() {
    const { comments } = this.props;

    return(
      <div className="comment-list">
        <p>{comments.filter((comment) => comment.deleted !== true).length} comments</p>

        <ul>
          {comments
            .sort((a, b) => a.voteScore < b.voteScore)
            .filter((comment) => comment.deleted !== true)
            .map((comment) => (
            <li className="comment" key={comment.id}>
              <div className="comment-ranking">
                <button onClick={() => this.voteComment(comment.id, 'upVote')}><FaCaretUp/></button>
                <span className="comment-ranking-value">{comment.voteScore}</span>
                <button onClick={() => this.voteComment(comment.id, 'downVote')}><FaCaretDown/></button>
              </div>
              <p>{comment.body}</p>
              <div className="comment-meta">
                <span className="comment-author">{comment.author}</span> at&nbsp;
                <span className="comment-timestamp">{comment.timestamp}</span>
              </div>
              <div className="comment-controls">
                <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// TODO: convert this into an array of posts
function mapStateToProps ({ comments }) {
  return {
    comments
  }
}

export default connect(mapStateToProps)(CommentList);