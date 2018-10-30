import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddResponsivePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      responsivePage: {},
      errors: {}
    };
  }

  handleValidation = () => {
    let responsivePage = this.state.responsivePage;
    let errors = {};
    let formIsValid = true;

    if ( !responsivePage["title"] || typeof responsivePage["title"] === undefined) {
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    } else if (!responsivePage["title"].length > 50) {
      formIsValid = false;
      errors["title"] = "Title length must be between 0 and 50 characters";
    }

    if (typeof responsivePage["description"] !== "undefined") {
      if (responsivePage["description"].length > 200) {
        formIsValid = false;
        errors["description"] =
          "Description length must be between 0 and 200 characters";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = event => {
    event.preventDefault();
    let title = event.target.elements.title.value;
    let description = event.target.elements.description.value;
    let publishedOn = new Date().toISOString(); //new page should have the current date
    let type = event.target.elements.type.value;
    let isActive = event.target.elements.isactive.checked;

    const responsivePage = {
      title,
      description,
      publishedOn,
      type,
      isActive
    };
    if (this.handleValidation()) {
      this.createResponsivePage(responsivePage);
    }
  };

  createResponsivePage = responsivePage => {
    axios
      .request({
        method: "POST",
        url: "http://pagesmanagement.azurewebsites.net/api/ResponsivePages",
        data: responsivePage
      })
      .then(response => {
        this.props.history.push("/");
      })
      .then(error => console.log(error));
  };

  handleChange = event => {
    let responsivePage = this.state.responsivePage;
    responsivePage[event.target.name] = event.target.value;
    this.setState({ responsivePage });
  };

  render() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <div className="form-input-fields">
          <div className="form-input-field-container">
            <input
              type="text"
              id="title"
              name="title"
              className="form-input-field"
              placeholder="title"
              onChange={this.handleChange}
            />
            <span className="form-validation-error">
              {this.state.errors["title"]}
            </span>
          </div>
          <div className="form-input-field-container">
            <textarea
              type="textarea"
              id="description"
              name="description"
              className="form-input-field-textarea"
              placeholder="description"
              onChange={this.handleChange}
            />
            <span className="form-validation-error">
              {this.state.errors["description"]}
            </span>
          </div>
          <div className="form-input-field-container">
            <select id="type" name="type" className="form-input-field" onChange={this.handleChange}>
              <option value="0">Menu</option>
              <option value="1">Events</option>
              <option value="2">Content</option>
            </select>
          </div>
          <div className="form-input-field-container">
          <div className="form-input-field-checkbox">
            <label>Active</label>
            <input type="checkbox" name="isactive" onChange={this.handleChange}/>
           </div>
          </div>
        </div>
        <div className="form-controls">
            <Link to={"/"} className="form-control-link">Cancel</Link>
            <button className="form-control-button" type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default AddResponsivePage;
