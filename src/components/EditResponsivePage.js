import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsivePage: ""
    };
  }

  componentWillMount() {
    this.getResponsivePage();
  }
  getResponsivePage = () => {
    let responsivePageId = this.props.match.params.id;
    axios
      .get(
        `http://pagesmanagement.azurewebsites.net/api/ResponsivePages/${responsivePageId}`
      )
      .then(response => {
        this.setState({ responsivePage: response.data });
      })
      .catch(error => console.log(error));
  };

  render() {
    const {responsivePage} = this.state;
    return (
      <div>
        <div className="responsivePageContainer">
          <input type="text" value={responsivePage.title} />
          <input type="text" value={responsivePage.description} />
          
          <p>
            {new Date(this.state.responsivePage.publishedOn).toLocaleDateString(
              "en-GB"
            )}
          </p>
          <select value={this.state.responsivePage.type}>
            <option value="0">Menu</option>
            <option value="1">Events</option>
            <option value="2">Content</option>
          </select>
          <Link to={"/"}>Back</Link>
          <Link to={`/ResponsivePages/edit/${this.state.responsivePage.id}`}>
            Save
          </Link>
        </div>
      </div>
    );
  }
}

export default Edit;
