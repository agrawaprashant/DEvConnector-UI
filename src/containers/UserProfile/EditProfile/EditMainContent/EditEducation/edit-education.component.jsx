import React from "react";
import AddEducationBox from "../../../../../components/UserProfile/MainSection/MainContent/Education/AddEducationBox/add-education-box.component";

class EditEducation extends React.Component {
  render() {
    return this.props.data && this.props.data.length !== 0 ? (
      <p>Edit Education Will be shown here!</p>
    ) : (
      <AddEducationBox />
    );
  }
}

export default EditEducation;
