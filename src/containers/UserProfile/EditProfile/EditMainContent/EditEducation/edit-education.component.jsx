import React from "react";
import AddEducationBox from "../../../../../components/UserProfile/MainSection/MainContent/Education/AddEducationBox/add-education-box.component";
import EducationCard from "../../../../../components/UserProfile/MainSection/MainContent/Education/EducationCard/education-card.component";
import classes from "./edit-education.module.css";
import AddNewEducation from "../../../AddMainContent/AddNewEducation/add-new-education.component";

class EditEducation extends React.Component {
  state = {
    addNewEducation: null,
  };

  addNewClickHandler = () => {
    this.setState({
      addNewEducation: <AddNewEducation cancel={this.cancelClickedHandler} />,
    });
  };

  cancelClickedHandler = () => {
    this.setState({
      addNewEducation: null,
    });
  };

  render() {
    let education = this.props.data.map((ed) => {
      return <EducationCard data={ed} />;
    });
    return this.props.data && this.props.data.length !== 0 ? (
      <div>
        {education}
        {this.state.addNewEducation ? (
          <div style={{ marginTop: "25px" }}>{this.state.addNewEducation}</div>
        ) : (
          <button
            className={classes.AddMoreEducation}
            onClick={this.addNewClickHandler}
          >
            Add Education
          </button>
        )}
      </div>
    ) : this.state.addNewEducation ? (
      this.state.addNewEducation
    ) : (
      <AddEducationBox clicked={this.addNewClickHandler} />
    );
  }
}

export default EditEducation;
