import React, { useState } from "react";
import AddBioBox from "./AddBioBox/add-bio-box.component";
import AddNewBio from "../../../../../containers/UserProfile/AddMainContent/AddNewBio/add-new-bio.component";
import classes from "./bio.module.css";

const Bio = (props) => {
  const [newBioComponent, setNewBioComponent] = useState(null);

  const addNewBioClickHandler = () => {
    setNewBioComponent(<AddNewBio cancel={cancelClickedHandler} />);
  };

  const cancelClickedHandler = () => {
    setNewBioComponent(null);
  };

  let newBio = newBioComponent ? (
    newBioComponent
  ) : (
    <AddBioBox clicked={addNewBioClickHandler} />
  );

  return (
    <div className={classes.Content}>
      {props.data ? (
        <p style={{ textAlign: "center", color: "#333" }}>{props.data}</p>
      ) : (
        newBio
      )}
    </div>
  );
};

export default Bio;
