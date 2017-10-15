import './styles/app.css';
import React, { Component } from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from './utils/ReadableAPI';
import PostList from './components/post_list';
import CategoryList from './components/category_list';
import AddPost from './views/add_post';
import Post from './views/post';
import Category from './views/category'
import { getPosts } from './actions/post_actions';

class App extends Component {
  componentDidMount() {
    ReadableAPI.getAllPosts().then((posts) => {
      this.props.dispatch(getPosts({posts}))
    });
  }

  render() {

    return (
      <div className="app">
        <header>
          <h1><Link to="/">Readable</Link></h1>
          <div className="add-post-link">
            <Link to="/add-post">Add New Post</Link>
          </div>
        </header>

        <main className="container">
          <Route path="/:category/:id" component={Post}/>
          <Route exact path="/:category" component={Category}/>
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

export default withRouter(connect(
  mapStateToProps
)(App));
