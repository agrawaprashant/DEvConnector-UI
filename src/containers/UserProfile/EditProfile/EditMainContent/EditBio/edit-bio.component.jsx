import React from "react";
import AddBioBox from "../../../../../components/UserProfile/MainSection/MainContent/Bio/AddBioBox/add-bio-box.component";
import EditBioComponent from "../../../AddMainContent/AddNewBio/add-new-bio.component";
import classes from "./edit-bio.module.css";
class EditBio extends React.Component {
  state = {
    editBioComponent: null,
  };

  addBioClickHandler = () => {
    this.setState({
      editBioComponent: (
        <EditBioComponent
          bio={this.props.data}
          cancel={this.cancelClickedHandler}
        />
      ),
    });
  };

  cancelClickedHandler = () => {
    this.setState({ editBioComponent: null });
  };

  render() {
    let bio = (
      <div className={classes.EditBio}>
        <p>{this.props.data}</p>
        <button
          className={classes.EditBioBtn}
          onClick={this.addBioClickHandler}
        >
          Edit Bio
        </button>
      </div>
    );
    return this.props.data ? (
      this.state.editBioComponent ? (
        this.state.editBioComponent
      ) : (
        bio
      )
    ) : this.state.editBioComponent ? (
      this.state.editBioComponent
    ) : (
      <AddBioBox addBio={this.addBioClickHandler} />
    );
  }
}

export default EditBio;
