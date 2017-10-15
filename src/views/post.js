import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import CommentList from '../components/comment_list';
import AddComment from '../views/add_comment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions/post_actions';

class Post extends React.Component {
  state = {
    post: {}
  }

  componentDidMount() {
    ReadableAPI.getPost(this.props.match.params.id).then((post) => {
      this.setState({post})
    });
  }

  deletePost = (postId) => {
    ReadableAPI.deletePost(postId).then((data) => {
      this.props.dispatch(deletePost(data));
    });
  }
  
  render() {
    const { post } = this.state;

    return (
      <div className="post">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">{post.author}</span> · 
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
        
        <p>{post.body}</p>

        <div className="post-controls">
          <Link to={`/${post.category}/${post.id}/edit`}>Edit Post</Link>
          <button onClick={() => this.deletePost(post.id)}>Delete Post</button>
        </div>

        <AddComment postId={this.props.match.params.id}/>
        <CommentList postId={this.props.match.params.id}/>
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

export default connect(mapStateToProps)(Post);