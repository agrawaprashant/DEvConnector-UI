import React, { useState } from "react";
import AddEducationBox from "./AddEducationBox/add-education-box.component";
import AddNewEducation from "../../../../../containers/UserProfile/AddMainContent/AddNewEducation/add-new-education.component";
import classes from "./education.module.css";
import EducationCard from "./EducationCard/education-card.component";

const Education = (props) => {
  const [newEducationComponent, setNewEducationComponent] = useState(null);

  const cancelClickedHandler = () => {
    setNewEducationComponent(null);
  };
  const addEducationClickedHandler = () => {
    setNewEducationComponent(<AddNewEducation cancel={cancelClickedHandler} />);
  };
  let newEducation = newEducationComponent ? (
    newEducationComponent
  ) : (
    <AddEducationBox clicked={addEducationClickedHandler} />
  );
  let education = props.data.map((ed) => {
    return <EducationCard key={ed._id} data={ed} />;
  });
  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? (
        <div className={classes.EducationCard}>{education}</div>
      ) : (
        newEducation
      )}
    </div>
  );
};

export default Education;
