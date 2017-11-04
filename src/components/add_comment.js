import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { addComment } from '../actions/comment_actions';
import serializeForm from 'form-serialize';

class AddComment extends React.Component {
  state = {
    author: '',
    body: ''
  }

  submitComment = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = shortid.generate();
    const timestamp = Date.now();
    const parentId = this.props.postId;
    const { author, body } = values;

    ReadableAPI
      .addComment(id, timestamp, body, author, parentId)
      .then((comment) => {
        this.props.dispatch(addComment({comment}));
      });
  }

  updateAuthor = (author) => { this.setState({ author }); }
  updateBody = (body) => { this.setState({ body }); }

  render() {
    return (
      <div className="add-comment">
        <form onSubmit={this.submitComment}>
          <h3>Add a New Comment</h3>

          <label htmlFor="add-comment-author">Name</label>
          <input name="author" id="add-comment-author" type="text"/>

          <label htmlFor="add-comment-body">Comment</label>
          <textarea name="body" id="add-comment-body"/>

          <div className="form-actions">
            <button className="btn">Add Comment</button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null)(AddComment);