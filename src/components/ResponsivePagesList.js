import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ResponsivePage from "./ResponsivePage";

class ResponsivePages extends Component {
  constructor() {
    super();
    this.state = {
      responsivePages: []
    };
  }

  componentWillMount() {
    this.getResponsivePages();
  }

  //get list of responsive pages
  getResponsivePages = () => {
    axios
      .get("http://pagesmanagement.azurewebsites.net/api/ResponsivePages")
      .then(response => {
        this.setState({ responsivePages: response.data });
      })
      .catch(error => console.log(error));
  };

  //delete responsive page
  deleteResponsivePage = (id) =>{
    fetch("http://pagesmanagement.azurewebsites.net/api/ResponsivePages/"+ id, {
      method: "DELETE",
    })

    this.setState({ 
      responsivePages:this.state.responsivePages.filter(r => r.id !== id )
    })
  }
  
  render() {
    const activeResponsivePages = this.state.responsivePages
      .filter(function(responsivePage) {
        return responsivePage.isActive === true;
      })
      .map((responsivePage, i) => {
        return (
          <ResponsivePage
            key={responsivePage.id}
            responsivePage={responsivePage}
            deleteResponsivePage = {this.deleteResponsivePage}
          />
        );
      });
    return (
      <div>
        <div className="top">
          <h2>Responsive Pages</h2>
          <div className="add-page">
            <Link to={"/ResponsivePages/AddResponsivePage"}>
              <i className="fa fa-plus" />
            </Link>
          </div>
        </div>
        <div className="list-container">{activeResponsivePages}</div>
      </div>
    );
  }
}

export default ResponsivePages;
