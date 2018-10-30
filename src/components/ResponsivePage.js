import React from "react";
import { Link } from "react-router-dom";

const ResponsivePage = props => {
  let type = ["Menu", "Events", "Content"];

  const getType = () => {
    return type[props.responsivePage.type];
  };

  return (
    <div className="list-item-container">
      <div className="list-item-details">
        <div className="list-item-details-row">
          <label>Title:</label>
          <p>{props.responsivePage.title}</p>
        </div>
        <div className="list-item-details-row">
          <label>Description:</label>
          <p>{props.responsivePage.description}</p>
        </div>
        <div className="list-item-details-row">
          <label>Published On:</label>
          <p>
            {new Date(props.responsivePage.publishedOn).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="list-item-details-row">
          <label>Type:</label>
          <p>{getType()}</p>
        </div>
      </div>
      <div className="list-item-controls">
        <Link to={`/ResponsivePages/edit/${props.responsivePage.id}`} className="list-item-control-link">Manage Page</Link>
        <button className="list-item-control-btn" onClick={()=>props.deleteResponsivePage(props.responsivePage.id)}>Delete</button>
        </div>
    </div>
  );
};

export default ResponsivePage;
