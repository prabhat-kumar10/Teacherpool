import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const Card = (props) => {
  return (
    <>
      <div className="card-container">
        <div className="card-img">
          <img src={props.image} alt="" />
        </div>
        <Link className="card-body">
          <span className="card-meta">
            {props.date} | {props.categories[0]}
          </span>
          <h5>{props.title}</h5>
          <div className="card-para">{props.content}</div>
          <a href="/f/looking-forward-to-dusshera-break-how-teachers-should-utilize-it">
            <span className="card-btn"> Continue reading -> </span>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Card;
