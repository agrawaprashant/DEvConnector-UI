import React, { useState } from "react";
import AddWorkBox from "./AddWorkBox/add-work-box.component";
import AddNewWork from "../../../../../containers/UserProfile/AddMainContent/AddNewWork/add-new-work.component";
import WorkExpCard from "./WorkExperienceCard/work-exp-card.component";
import classes from "./work.module.css";

const Work = (props) => {
  let [newWorkComponent, setNewWorkComponent] = useState(null);

  const addWorkClickedHandler = () => {
    setNewWorkComponent(<AddNewWork cancel={cancelClickedHandler} />);
  };

  const cancelClickedHandler = () => {
    setNewWorkComponent(null);
  };
  let newWork = newWorkComponent ? (
    newWorkComponent
  ) : (
      <AddWorkBox clicked={addWorkClickedHandler} />
    );
  let work = props.data.map((work) => {
    return <WorkExpCard key={work._id} data={work} owner />;
  });

  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? work : newWork}
    </div>
  );
};

export default Work;
