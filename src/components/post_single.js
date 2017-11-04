import '../styles/forms.css';
import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import CommentList from '../components/comment_list';
import AddComment from '../components/add_comment';
import { connect } from 'react-redux';
import { deletePost } from '../actions/post_actions';
import { Link } from 'react-router-dom';

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
  
  render() {
    const { post, isEditing } = this.state;

    return (
      <div className="post-single">
        {post.deleted === true || Object.keys(post).length === 0
          ? <h2>Sorry, this post has been deleted</h2>
          : <div>
              <div>
                  <h1>{post.title}</h1>
                  <div className="post-meta">
                    <span className="post-author">by {post.author}</span>
                  </div>
                  <p className="post-body">{post.body}</p>
                  <div className="post-controls">
                    <Link className="btn-link" to={`/${post.category}/${post.id}/edit`}>Edit Post</Link>
                    <button className="btn-link red" onClick={() => this.deletePost(post.id)}>Delete Post</button>
                  </div>
              </div>
              <div className="comments">
                <AddComment postId={this.props.match.params.id}/>
                <CommentList postId={this.props.match.params.id}/>
              </div>
            </div>}
        </div>
      )
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps)(PostSingle);