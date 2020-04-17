import React from "react";
import AddSkillsBox from "../../../../../components/UserProfile/MainSection/MainContent/Skills/AddSkillsBox/add-skills-box.component";
import EditSkillsComponent from "../../../AddMainContent/AddNewSkill/add-new-skill.component";
import classes from "./edit-skills.module.css";

class EditSkiils extends React.Component {
  state = {
    editSkillsComponent: null,
  };

  editSkillsClicked = () => {
    this.setState({
      editSkillsComponent: (
        <EditSkillsComponent
          skills={this.props.data}
          cancel={this.cancelClickedHandler}
        />
      ),
    });
  };

  cancelClickedHandler = () => {
    this.setState({ editSkillsComponent: null });
  };
  render() {
    return this.props.data && this.props.data.length !== 0 ? (
      this.state.editSkillsComponent ? (
        this.state.editSkillsComponent
      ) : (
        <div className={classes.EditSkills}>
          <p>{this.props.data.join(", ")}</p>
          <button className={classes.EditBtn} onClick={this.editSkillsClicked}>
            Edit Skills
          </button>
        </div>
      )
    ) : (
      <AddSkillsBox />
    );
  }
}

export default EditSkiils;
