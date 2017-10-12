import React from 'react';

class AddPost extends React.Component {
  state = {
    query: '',
    searchResults: []
  }

  addPost = (id, title, body, author, category) => {

  }

  render() {
    return (
      <div className="add-post">
        <form>
          <h3>Add a New Post</h3>

          <label htmlFor="add-post-title">Title</label><br/>
          <input id="add-post-title" type="text" /><br/>

          <label htmlFor="add-post-author">Author</label><br/>
          <input id="add-post-author" type="text" /><br/>

          <label htmlFor="add-post-category">Category</label><br/>
          <select id="add-post-category">
            <option>React</option>
            <option>Redux</option>
            <option>Udacity</option>
          </select><br/>

          <label htmlFor="add-post-body">Body</label><br/>
          <textarea id="add-post-body"/><br/>
        </form>
      </div>
    )
  }
}

export default AddPost;