import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { capitalize } from '../utils/helpers';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { addPost } from '../actions/post_actions';
import serializeForm from 'form-serialize';
import { withRouter, Redirect } from 'react-router-dom'; 

class AddPost extends React.Component {
  state = {
    categories: [],
    fireRedirect: false,
    postId: null,
    postCategory: null
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
        this.setState({ 
          fireRedirect: true,
          postId: post.id,
          postCategory: post.category
        })
      });
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((data) => {
      this.setState(data)
    });
  }

  render() {
    const { postId, postCategory } = this.state;

    return (
      <div className="add-post">
        <form onSubmit={this.submitPost}>
          <h3>Add a New Post</h3>

          <label htmlFor="add-post-title">Title</label>
          <input name="title" id="add-post-title" type="text"/>

          <label htmlFor="add-post-author">Author</label>
          <input name="author" id="add-post-author" type="text"/>

          <label htmlFor="add-post-category">Category</label>
          <select name="category" id="add-post-category">
            {this.state.categories.map((cat) => (
              <option value={cat.name} key={cat.name}>{capitalize(cat.name)}</option>
            ))}
          </select>

          <label htmlFor="add-post-body">Body</label>
          <textarea name="body" id="add-post-body"/>

          <button className="btn">Add Post</button>
        </form>
        {this.state.fireRedirect && (
          <Redirect to={`/${postCategory}/${postId}`}/>
        )}
      </div>
    )
  }
}



export default withRouter(connect(null)(AddPost));