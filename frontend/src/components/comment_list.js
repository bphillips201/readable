import '../styles/comments.css';
import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { getComments } from '../actions/comment_actions';
import { connect } from 'react-redux';
import Comment from './comment';

class CommentList extends React.Component {
  state = {
    comments: []
  }
  
  componentDidMount() {
    ReadableAPI.getPostComments(this.props.postId).then((comments) => {
      this.props.dispatch(getComments({comments}))
    });
  }

  render() {
    const { comments } = this.props;
    const numComments = comments.filter((comment) => comment.deleted !== true && comment.parentDeleted !== true).length;

    return(
      <div className="comment-list">
        <p>{numComments} comments</p>

        <ul>
          {comments
            .sort((a, b) => a.voteScore < b.voteScore)
            .filter((comment) => comment.deleted !== true && comment.parentDeleted !== true)
            .map((comment) => (
              <Comment key={comment.id} comment={comment}/>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments
  }
}

export default connect(mapStateToProps)(CommentList);