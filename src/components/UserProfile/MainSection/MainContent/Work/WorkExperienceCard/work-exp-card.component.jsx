import React from "react";
import classes from "./work-exp-card.module.css";
import Modal from "../../../../../UI/Modal/confirm-modal.component";

const workExpCard = (props) => {
  return (
    <div className={classes.WorkExpCard}>
      <h3>{props.data.company}</h3>
      <p>
        {props.data.title}, {props.data.location}
      </p>
      <small>
        {props.data.from} - {props.data.to}
      </small>
      <div className={classes.ExtraContent}>
        {props.data.description ? <p>{props.data.description}</p> : null}
      </div>
      <div className={classes.Buttons}>
        <button className={classes.EditBtn}>
          <i class="fas fa-2x fa-edit"></i>
        </button>
        <button className={classes.DeleteBtn}>
          <i class="fas fa-2x fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default workExpCard;
