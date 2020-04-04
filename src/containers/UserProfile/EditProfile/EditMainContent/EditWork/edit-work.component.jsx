import React from "react";
import AddWorkBok from "../../../../../components/UserProfile/MainSection/MainContent/Work/AddWorkBox/add-work-box.component";

class EditWork extends React.Component {
  render() {
    return this.props.data && this.props.data.length !== 0 ? (
      <p>Edit work Will be shown here!</p>
    ) : (
      <AddWorkBok />
    );
  }
}

export default EditWork;
