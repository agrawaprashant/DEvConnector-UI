import React from "react";
import classes from "./education-card.module.css";
import Moment from "react-moment";

const EducationCard = (props) => {
  return (
    <div className={classes.EducationCard}>
      <h3>{props.data.school}</h3>
      <p>
        {props.data.degree}, {props.data.fieldofstudy}
      </p>
      <small>
        <Moment format="YYYY">{props.data.from}</Moment> -
        <Moment format="YYYY">{props.data.to}</Moment>
      </small>
      <div className={classes.ExtraContent}>
        {props.data.description ? <p>{props.data.description}</p> : null}
      </div>
      {props.owner ? (
        <div className={classes.Buttons}>
          <button className={classes.EditBtn}>
            <i class="fas fa-2x fa-edit"></i>
          </button>
          <button className={classes.DeleteBtn}>
            <i class="fas fa-2x fa-trash"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default EducationCard;
