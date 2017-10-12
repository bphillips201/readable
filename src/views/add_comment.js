import React from 'react';

class AddComment extends React.Component {
  state = {
    query: '',
    searchResults: []
  }

  addComment = (id, title, body, author, category) => {

  }

  render() {
    return (
      <div className="add-comment">
        <form>
          <h3>Add a New Comment</h3>

          <label htmlFor="add-comment-author">Name</label><br/>
          <input id="add-comment-author" type="text" /><br/>

          <label htmlFor="add-comment-body">Comment</label><br/>
          <textarea id="add-comment-body"/><br/>

          <button>Add Comment</button>
        </form>
      </div>
    )
  }
}

export default AddComment;