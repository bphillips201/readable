import React from 'react';
// import { capitalize } from 'capitalize';

class CategoryList extends React.Component {
  render() {

    return(
      <ul className="category-list">
        <li><a href="#">React</a></li>
        <li><a href="#">Redux</a></li>
        <li><a href="#">Udacity</a></li>
      </ul>
    )
  }
}

export default CategoryList;