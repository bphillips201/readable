import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import PostList from '../components/post_list';

class Category extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    ReadableAPI.getCategoryPosts(this.props.match.params.category).then((posts) => {
      this.setState({ posts })
    });
  }

  render() {

    return (
      <div className="category-posts">
        <PostList
          posts={this.state.posts}
        />
      </div>
    );
  }
}

export default Category
