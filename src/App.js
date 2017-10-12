import './styles/App.css';
import React, { Component } from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from './utils/ReadableAPI';
import PostList from './components/post_list';
import CategoryList from './components/category_list';
import AddPost from './views/add_post';
import Post from './views/post';
import { addPost, getPosts } from './actions/post_actions';

class App extends Component {
  state = {}

  componentDidMount() {
    ReadableAPI.getAllPosts().then((posts) => {
      this.props.getAllPosts({ posts })
    });
  }

  render() {

    return (
      <div className="app">
        <header>
          <h1><Link to="/">Readable</Link></h1>
        </header>

        <main className="container">
          <Route path="/post/:id" component={Post}/>
          <Route path="/add-post" component={AddPost}/>
          <Route exact path="/" render={() => (
            <div className="content">
              <aside className="categories">
                <CategoryList/>
              </aside>
              
              <div className="posts">
                <PostList
                  posts={this.props.posts}
                />
              </div>

              <div className="open-search">
                <Link to="/add-post">Add New Post</Link>
              </div>
            </div>
          )}/>
        </main>
      </div>
    );
  }
}

// TODO: convert this into an array of posts
function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getPosts(data)),
    submitPost: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
