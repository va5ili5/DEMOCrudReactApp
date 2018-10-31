import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/en-gb';

import 'react-datepicker/dist/react-datepicker.css';
class EditResponsivePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      title:'',
      description:'',
      type:0,
      publishedOn:moment(),
      isActive:true,
      errors: {}
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
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          type: response.data.type,
          publishedOn: response.data.publishedOn,
          isActive: response.data.isActive
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = event => {
    event.preventDefault();
    let id = this.state.id;
    let title = event.target.elements.title.value;
    let description = event.target.elements.description.value;
    let publishedOn = this.state.publishedOn;
    let type = parseInt(event.target.elements.type.value);
    let isActive = event.target.elements.isActive.checked;

    const responsivePage = {
      id,
      title,
      description,
      publishedOn,
      type,
      isActive
    };
    if (this.handleValidation()) {
      this.updateResponsivePage(responsivePage);
    }
  };

  handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if ( !this.state["title"] || typeof this.state["title"] === "undefined") {
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    } else if (!this.state["title"].length > 50) {
      formIsValid = false;
      errors["title"] = "Title length must be between 0 and 50 characters";
    }

    if (typeof this.state["description"] !== "undefined") {
      if (this.state["description"].length > 200) {
        formIsValid = false;
        errors["description"] =
          "Description length must be between 0 and 200 characters";
      }
    }
    
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleChange = event => {
    //event.preventDefault();

    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({ [name]:value });
  };
  
  updateResponsivePage = responsivePage => {
    axios
      .request({
        method: "PUT",
        url: `http://pagesmanagement.azurewebsites.net/api/ResponsivePages/${responsivePage.id}`,
        data: responsivePage
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .then(error => console.log(error));
  };

  handleDateChange =(date) => {
    this.setState({publishedOn: moment(date, 'MM/DD/YYYY')})
  }

  handleDateRawChange = event =>{
    event.preventDefault();
  }

  render() {
    return (
      <div className="form-container">
        <div className="top-title">
          <h2>Edit Responsive Page</h2>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-input-fields">
          <div className="form-input-field-container">
            <input type="text" id="title" name="title" className="form-input-field" placeholder="title" value={this.state.title} onChange={this.handleChange} />
            <span className="form-validation-error">{this.state.errors["title"]}</span>
          </div>
          <div className="form-input-field-container">
            <textarea type="textarea" id="description" name="description" className="form-input-field-textarea" placeholder="description" onChange={this.handleChange} value={this.state.description} />
            <span className="form-validation-error">{this.state.errors["description"]}</span>
          </div>
          <div className="form-input-field-container">
            <select id="type" name="type" className="form-input-field" onChange={this.handleChange} value={this.state.type} >
              <option value="0">Menu</option>
              <option value="1">Events</option>
              <option value="2">Content</option>
            </select>
          </div>
          <div className="form-input-field-container-datepicker">
            <DatePicker className="form-input-field" selected={moment(this.state.publishedOn)} onChangeRaw={this.handleDateRawChange} onChange={this.handleDateChange} locale={'en-GB'} format="DD/MM/YYYY" placeholderText="Published On" />
            <span className="form-validation-error">{this.state.errors["publishedOn"]}</span>
          </div>
          <div className="form-input-field-container">
            <div className="form-input-field-checkbox">
              <label>Active</label>
              <input type="checkbox" name="isActive" onChange={this.handleChange} checked={this.state.isActive} />
            </div>
            </div>
          </div>
          <div className="form-controls">
            <Link to={"/"} className="form-control-link">Cancel</Link>
            <button className="form-control-button" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditResponsivePage;
