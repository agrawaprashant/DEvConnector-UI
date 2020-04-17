import React from "react";
import AddWorkBox from "../../../../../components/UserProfile/MainSection/MainContent/Work/AddWorkBox/add-work-box.component";
import WorkExpCard from "../../../../../components/UserProfile/MainSection/MainContent/Work/WorkExperienceCard/work-exp-card.component";
import AddNewWork from "../../../../UserProfile/AddMainContent/AddNewWork/add-new-work.component";
import classes from "./edit-work.module.css";

class EditWork extends React.Component {
  state = {
    addNewWork: null,
  };

  addNewClickHandler = () => {
    console.log("asdfasdfasdf");
    this.setState({
      addNewWork: <AddNewWork cancel={this.cancelClickedHandler} />,
    });
  };

  cancelClickedHandler = () => {
    this.setState({
      addNewWork: null,
    });
  };

  render() {
    let work = this.props.data.map((work) => {
      return <WorkExpCard key={work._id} data={work} />;
    });
    return this.props.data && this.props.data.length !== 0 ? (
      <div>
        {work}
        {this.state.addNewWork ? (
          <div style={{ marginTop: "25px" }}>{this.state.addNewWork}</div>
        ) : (
          <button
            className={classes.AddMoreWork}
            onClick={this.addNewClickHandler}
          >
            Add Work
          </button>
        )}
      </div>
    ) : this.state.addNewWork ? (
      this.state.addNewWork
    ) : (
      <AddWorkBox clicked={this.addNewClickHandler} />
    );
  }
}

export default EditWork;
