import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Redirect, Link } from 'react-router-dom'; 
import { editPost } from '../actions/post_actions';

class EditPost extends React.Component {
  state = {
    fireRedirect: false,
    title: "",
    body: "",
    category: "",
    id: ""
  }

  componentDidMount() {
    ReadableAPI.getPost(this.props.match.params.id).then((post) => {
      this.setState({
        title: post.title,
        body: post.body,
        category: post.category,
        id: post.id
      })
    });
  }

  updateTitle = (e) => { this.setState({ title: e }) }
  updateBody = (e) => { this.setState({ body: e }) }

  updatePost = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const { id } = this.state;

    ReadableAPI.updatePost(id, values.title, values.body).then((data) => {
      this.props.dispatch(editPost(data.id, data.title, data.body));
      this.setState({ fireRedirect: true })
    });
  }

  render() {
    const { title, body, category, id } = this.state;

    return (
      <div className="add-post">
        <form onSubmit={this.updatePost}>
          <h3>Edit Post</h3>

          <label htmlFor="add-post-title">Title</label>
          <input name="title" id="add-post-title" type="text" value={title} onChange={(e) => this.updateTitle(e.target.value)}/>

          <label htmlFor="add-post-body">Body</label>
          <textarea name="body" id="add-post-body" value={body} onChange={(e) => this.updateBody(e.target.value)}/>

          <button className="btn">Update Post</button>&nbsp;
          <Link className="btn-link" to={`${category}/${id}`}>Cancel</Link>
        </form>
        {this.state.fireRedirect && (
          <Redirect to={`/${category}/${id}`}/>
        )}
      </div>
    )
  }
}

export default connect(null)(EditPost);