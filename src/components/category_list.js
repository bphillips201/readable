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
      <ul className="category-list">
        {this.state.categories.map((cat) => (
          <li key={cat.name}><Link to={cat.path}>{capitalize(cat.name)}</Link></li>
        ))}
      </ul>
    )
  }
}

export default CategoryList;