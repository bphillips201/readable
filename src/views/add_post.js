import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { capitalize } from '../utils/helpers';
import shortid from 'shortid';

class AddPost extends React.Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
    categories: []
  }

  addPost = (title, body, author, category) => {
    const id = shortid.generate();
    const timestamp = Date.now();

    ReadableAPI
      .addPost(id, timestamp, title, body, author, category)
      .then((data) => {
        console.log(data);
      });
  }

  updateTitle = (title) => { this.setState({ title }); }
  updateAuthor = (author) => { this.setState({ author }); }
  updateCategory = (category) => { this.setState({ category }) }
  updateBody = (body) => { this.setState({ body }); }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((data) => {
      this.setState(data)
    });
  }

  render() {
    return (
      <div className="add-post">
        <form>
          <h3>Add a New Post</h3>

          <label htmlFor="add-post-title">Title</label><br/>
          <input value={this.state.title} id="add-post-title" type="text" onChange={(event) => this.updateTitle(event.target.value)}/><br/>

          <label htmlFor="add-post-author">Author</label><br/>
          <input value={this.state.author} id="add-post-author" type="text" onChange={(event) => this.updateAuthor(event.target.value)}/><br/>

          <label htmlFor="add-post-category">Category</label><br/>
          <select value={this.state.category} onChange={(event) => this.updateCategory(event.target.value)} id="add-post-category">
            {this.state.categories.map((cat) => (
              <option value={cat.name} key={cat.name}>{capitalize(cat.name)}</option>
            ))}
          </select><br/>

          <label htmlFor="add-post-body">Body</label><br/>
          <textarea id="add-post-body" onChange={(event) => this.updateBody(event.target.value)}/><br/>

          <button
            type="button"
            onClick={() => this.addPost(
              this.state.title,
              this.state.body,
              this.state.author,
              this.state.category
            )}
          >
            Add Post
          </button>
        </form>
      </div>
    )
  }
}

export default AddPost;