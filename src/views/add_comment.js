import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import shortid from 'shortid';

class AddComment extends React.Component {
  state = {
    author: '',
    body: ''
  }

  addComment = (body, author) => {
    const id = shortid.generate();
    const timestamp = Date.now();
    const parentId = this.props.postId;

    ReadableAPI
      .addComment(id, timestamp, body, author, parentId)
      .then((data) => {
        console.log(data);
      });
  }

  updateAuthor = (author) => { this.setState({ author }); }
  updateBody = (body) => { this.setState({ body }); }

  render() {
    return (
      <div className="add-comment">
        <form>
          <h3>Add a New Comment</h3>

          <label htmlFor="add-comment-author">Name</label><br/>
          <input id="add-comment-author" type="text" onChange={(event) => this.updateAuthor(event.target.value)} /><br/>

          <label htmlFor="add-comment-body">Comment</label><br/>
          <textarea id="add-comment-body" onChange={(event) => this.updateBody(event.target.value)}/><br/>

          <button
            type="button"
            onClick={() => this.addComment(
              this.state.body,
              this.state.author
            )}
          >
            Add Comment
          </button>
        </form>
      </div>
    )
  }
}

export default AddComment;