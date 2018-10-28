import React, { Component } from "react";
import axios from "axios";

class AddResponsivePage extends Component {
  state = {
    responsivePage: ""
  };

  //create new responsive page
  createResponsivePage = event => {
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
  render() {
    return (
      <div>
        <div className="add-page-top">
          <h2>Add Responsive Page</h2>
        </div>
        <div className="responsive-page-container">
          <form className="form" onSubmit={this.createResponsivePage}>
            <div className="form-controls">
              <input
                type="text"
                id="title"
                name="title"
                className="input-control"
                placeholder="title"
              />

              <textarea
                type="textarea"
                id="description"
                name="description"
                className="input-control"
                placeholder="description"
              />
              <select id="type" name="type" className="input-control">
                <option value="0">Menu</option>
                <option value="1">Events</option>
                <option value="2">Content</option>
              </select>
              <div className="input-control-activate">
                <label className>Activate</label>
                <input type="checkbox" name="isactive" />
              </div>
            </div>
            <div className="responsive-page-save">
              <button className="btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddResponsivePage;
