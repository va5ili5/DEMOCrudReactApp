import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResponsivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsivePage: props.responsivePage,
      type: ["Menu", "Events", "Content"]
    };
  }

  getType = () => {
    return this.state.type[this.state.responsivePage.type];
  };

  render() {
    return (
      <div className="responsive-page-container">
        <div className = "responsive-page-details">
          <div className="resposive-page-item">
            <label>Title:</label>
            <p>{this.state.responsivePage.title}</p>
          </div>
          <div className="resposive-page-item">
            <label>Description:</label>
            <p>{this.state.responsivePage.description}</p>
          </div>
          <div className="resposive-page-item">
            <label>Published On:</label>
            <p>
              {new Date(
                this.state.responsivePage.publishedOn
              ).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="resposive-page-item">
            <label>Type:</label>
            <p>{this.getType()}</p>
          </div>
        </div>
        <div className = "responsive-page-controls">
        <div className="responsive-page-manage-page">
        <Link to={`/ResponsivePages/edit/${this.state.responsivePage.id}`}>
            Manage Page
          </Link>
        </div>
        </div>
      </div>
    );
  }
}

export default ResponsivePage;
