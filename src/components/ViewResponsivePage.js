import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ResponsivePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            responsivePage: props.responsivePage
        }
    }
  render() {
    return (
      <div className="responsivePageContainer">
        <h3>{this.state.responsivePage.title}</h3>
        <p>{this.state.responsivePage.description}</p>
        <p>
          {new Date(this.state.responsivePage.publishedOn).toLocaleDateString("en-GB")}
        </p>
        <select value={this.state.responsivePage.type}>
          <option value="0">Menu</option>
          <option value="1">Events</option>
          <option value="2">Content</option>
        </select>
        <Link to={`/ResponsivePages/edit/${this.state.responsivePage.id}`}>Edit</Link>
        <button className="btn">Delete</button>
        <button className="btn">Edit</button>
      </div>
    );
  }
}

export default ResponsivePage;
