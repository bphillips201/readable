import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import PostList from '../components/post_list';
import CategoryList from '../components/category_list';

class Category extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    ReadableAPI.getCategoryPosts(this.props.match.params.category).then((posts) => {
      this.setState({ posts })
    });
  }

  componentWillReceiveProps(nextProps) {
    ReadableAPI.getCategoryPosts(nextProps.match.params.category).then((posts) => {
      this.setState({ posts })
    });  
  }

  render() {

    return (
      <div className="category-posts">
        <div className="content">
          <aside className="categories">
            <CategoryList/>
          </aside>
          
          <div className="posts">
            <PostList
              posts={this.state.posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Category
