import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { capitalize } from '../utils/helpers';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { addPost } from '../actions/post_actions';
import serializeForm from 'form-serialize';

class AddPost extends React.Component {
  state = {
    categories: []
  }

  submitPost = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = shortid.generate();
    const timestamp = Date.now();
    const { title, author, category, body } = values;

    ReadableAPI
      .addPost(id, timestamp, title, body, author, category)
      .then((post) => {
        this.props.dispatch(addPost({post}));
      });
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((data) => {
      this.setState(data)
    });
  }

  render() {
    return (
      <div className="add-post">
        <form onSubmit={this.submitPost}>
          <h3>Add a New Post</h3>

          <label htmlFor="add-post-title">Title</label><br/>
          <input name="title" id="add-post-title" type="text"/><br/>

          <label htmlFor="add-post-author">Author</label><br/>
          <input name="author" id="add-post-author" type="text"/><br/>

          <label htmlFor="add-post-category">Category</label><br/>
          <select name="category" id="add-post-category">
            {this.state.categories.map((cat) => (
              <option value={cat.name} key={cat.name}>{capitalize(cat.name)}</option>
            ))}
          </select><br/>

          <label htmlFor="add-post-body">Body</label><br/>
          <textarea name="body" id="add-post-body"/><br/>

          <button>Add Post</button>
        </form>
      </div>
    )
  }
}

export default connect(null)(AddPost);