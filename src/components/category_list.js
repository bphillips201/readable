import React from 'react';
import { capitalize } from '../utils/helpers';

class CategoryList extends React.Component {
  render() {

    return(
      <ul className="category-list">
        <li><a href="#">{capitalize("react")}</a></li>
        <li><a href="#">Redux</a></li>
        <li><a href="#">Udacity</a></li>
      </ul>
    )
  }
}

export default CategoryList;