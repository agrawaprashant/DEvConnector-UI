import React from "react";
import AddSkillsBox from "../../../../../components/UserProfile/MainSection/MainContent/Skills/AddSkillsBox/add-skills-box.component";

class EditSkiils extends React.Component {
  render() {
    return this.props.data && this.props.data.length !== 0 ? (
      <p>Edit Skills Will be shown here!</p>
    ) : (
      <AddSkillsBox />
    );
  }
}

export default EditSkiils;
