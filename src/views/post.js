import React from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';

class Post extends React.Component {
  state = {
    post: {}
  }

  componentDidMount() {
    ReadableAPI.getPost(this.props.match.params.id).then((post) => {
      this.setState({post})
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
      </div>
    )
  }
}

export default Post;