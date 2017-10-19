import '../styles/forms.css';
import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import CommentList from '../components/comment_list';
import AddComment from '../views/add_comment';
import { connect } from 'react-redux';
import { deletePost, editPost } from '../actions/post_actions';
import serializeForm from 'form-serialize';

class PostSingle extends React.Component {
  state = {
    post: {},
    isEditing: false
  }

  componentDidMount() {
    ReadableAPI.getPost(this.props.match.params.id).then((post) => {
      this.setState({post})
    });
  }

  deletePost = (postId) => {
    ReadableAPI.deletePost(postId).then((post) => {
      this.props.dispatch(deletePost(post));
      this.setState({ post })
    });
  }

  enableEdit = () => { this.setState({ isEditing: true }) }
  cancelEdit = () => { this.setState({ isEditing: false }) }

  updatePost = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const { post } = this.state;

    ReadableAPI.updatePost(post.id, values.title, values.body).then((data) => {
      this.props.dispatch(editPost(data.id, data.title, data.body));
      this.setState({ 
        post: data,
        isEditing: false
      });
    });
  }
  
  render() {
    const { post, isEditing } = this.state;

    return (
      <div className="post-single">
        {post.deleted === true || Object.keys(post).length === 0
          ? <h2>Sorry, this post has been deleted</h2>
          : <div>
              {isEditing === true
                ? <form onSubmit={this.updatePost}>
                    <h1><input type="text" name="title" className="inline-input" defaultValue={post.title} /></h1>
                    <div className="post-meta">
                      <span className="post-author">by {post.author}</span>
                    </div>
                    <p className="post-body"><textarea name="body" className="inline-input" defaultValue={post.body} /></p>
                    <div className="post-controls">
                      <button className="btn push-right">Update Post</button>
                      <button className="btn-link" onClick={() => this.cancelEdit()}>Cancel</button>
                      <button className="btn-link red" onClick={() => this.deletePost(post.id)}>Delete Post</button>
                    </div>
                  </form>
                : <div>
                    <h1>{post.title}</h1>
                    <div className="post-meta">
                      <span className="post-author">by {post.author}</span>
                    </div>
                    <p className="post-body">{post.body}</p>
                    <div className="post-controls">
                      <button className="btn-link" onClick={() => this.enableEdit()}>Edit Post</button>
                      <button className="btn-link red" onClick={() => this.deletePost(post.id)}>Delete Post</button>
                    </div>
                </div>}
              <div className="comments">
                <AddComment postId={this.props.match.params.id}/>
                <CommentList postId={this.props.match.params.id}/>
              </div>
            </div>}
        </div>
      )
  }
}

// TODO: convert this into an array of posts
function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps)(PostSingle);