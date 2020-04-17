import React, { useState } from "react";
import AddSkillsBox from "./AddSkillsBox/add-skills-box.component";
import AddNewSKill from "../../../../../containers/UserProfile/AddMainContent/AddNewSkill/add-new-skill.component";
import classes from "./skills.module.css";

const Skills = (props) => {
  const [newSkillComponent, setNewSkillComponent] = useState(null);

  const addSkillsClickedHandler = () => {
    setNewSkillComponent(<AddNewSKill cancel={cancelClickedHandler} />);
  };

  const cancelClickedHandler = () => {
    setNewSkillComponent(null);
  };

  let newSkill = newSkillComponent ? (
    newSkillComponent
  ) : (
    <AddSkillsBox clicked={addSkillsClickedHandler} />
  );

  return (
    <div className={classes.Content}>
      {props.data.length !== 0 ? (
        <p style={{ textAlign: "center", color: "#333" }}>
          {props.data.join(", ")}
        </p>
      ) : (
        newSkill
      )}
    </div>
  );
};

export default Skills;
