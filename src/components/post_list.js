import '../styles/posts.css';
import React from 'react';
import Post from './post';

class PostList extends React.Component {

  state = {
    sortDir: "DESC"
  }

  toggleSort = (dir) => {
    dir === "DESC" ? this.setState({ sortDir: "ASC" }) : this.setState({ sortDir: "DESC" });
  }

  sort = (dir, a, b) => {
    return dir === "DESC" ? a < b : a > b;
  } 

  render() {
    const { sortDir } = this.state;

    return(
      <div>
        <p className="align-right">Sort by Votes <button onClick={() => this.toggleSort(sortDir)} className="btn-link">{sortDir}</button></p>

        <ul className="post-list">
          {this.props.posts
            .sort((a, b) => this.sort(sortDir, a.voteScore, b.voteScore))
            .filter((post) => post.deleted !== true)
            .map((post) => (
              <Post post={post} key={post.id}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default PostList;