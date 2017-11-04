import '../styles/categories.css';
import React from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';
import { capitalize } from '../utils/helpers';

class CategoryList extends React.Component {
  state = {
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((data) => {
      this.setState(data)
    });
  }
  
  render() {
    return(
      <div>
        <h3>Categories</h3>
        <ul className="category-list">
          {this.state.categories.map((cat) => (
            <li key={cat.name}><Link to={`/${cat.path}`}>{capitalize(cat.name)}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoryList;