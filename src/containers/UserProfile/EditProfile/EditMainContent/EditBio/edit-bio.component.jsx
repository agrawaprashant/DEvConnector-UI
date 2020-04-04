import React from "react";
import AddBioBox from "../../../../../components/UserProfile/MainSection/MainContent/Bio/AddBioBox/add-bio-box.component";

class EditBio extends React.Component {
  render() {
    return this.props.data ? (
      <p>Edit Bio Will be shown here!</p>
    ) : (
      <AddBioBox />
    );
  }
}

export default EditBio;
