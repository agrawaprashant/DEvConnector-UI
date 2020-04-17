import React from "react";
import { updateObject, buildFormControl } from "../../../../shared/utility";
import { checkValidity } from "../../../../shared/checkInputValidity";
import InputWithIcon from "../../../../components/UI/InputWithIcon/input-icon.component";
import classes from "./edit-dashboard.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/actions";

class EditDashboard extends React.Component {
  state = {
    dashBoardForm: {
      company: buildFormControl(
        "input",
        { type: "text", placeholder: "Company Name" },
        {
          value: this.props.data.profileData
            ? this.props.data.profileData.company
            : "",
        },
        {},
        { iconClass: "far fa-building" }
      ),
      location: buildFormControl(
        "input",
        { type: "text", placeholder: "Location" },
        {
          value: this.props.data.profileData
            ? this.props.data.profileData.location
            : "",
        },
        {},
        { iconClass: "fas fa-map-marker-alt" }
      ),
      handle: buildFormControl(
        "input",
        { type: "text", placeholder: "Enter User Name" },
        {
          value: this.props.data.profileData
            ? this.props.data.profileData.handle
            : "",
        },
        { required: true },
        { iconClass: "fas fa-at" }
      ),
      status: buildFormControl(
        "input",
        { type: "text", placeholder: "Designation" },
        {
          value: this.props.data.profileData
            ? this.props.data.profileData.status
            : "",
        },
        {},
        { iconClass: "far fa-id-badge" }
      ),
    },
  };

  inputChangedHandler = (event, controlName) => {
    let valid = checkValidity(
      event.target.value,
      this.state.dashBoardForm[controlName].validationRules
    );
    let updatedFormControl = updateObject(
      this.state.dashBoardForm[controlName],
      {
        value: event.target.value,
        valid: valid,
        touched: true,
      }
    );
    let updatedForm = updateObject(this.state.dashBoardForm, {
      [controlName]: updatedFormControl,
    });

    this.setState({ dashBoardForm: updatedForm });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    let userEnterdData = {};
    for (let key in this.state.dashBoardForm) {
      const value = this.state.dashBoardForm[key].value;
      if (value.trim().length !== 0) {
        userEnterdData[key] = value;
      }
    }

    this.props.onEditProfile(userEnterdData, this.props.token);
  };

  render() {
    let formControls = [];
    for (let key in this.state.dashBoardForm) {
      formControls.push({
        controlName: key,
        elementType: this.state.dashBoardForm[key].elementType,
        elementConfig: this.state.dashBoardForm[key].elementConfig,
        value: this.state.dashBoardForm[key].value,
        valid: this.state.dashBoardForm[key].valid,
        touched: this.state.dashBoardForm[key].touched,
        styles: this.state.dashBoardForm[key].styles,
      });
    }
    let formElements = formControls.map((control) => {
      return (
        <InputWithIcon
          key={control.controlName}
          elementType={control.elementType}
          elementConfig={control.elementConfig}
          iconClass={control.styles.iconClass}
          valid={control.valid}
          value={control.value}
          touched={control.touched}
          changed={(event) =>
            this.inputChangedHandler(event, control.controlName)
          }
        />
      );
    });
    return (
      <div className={classes.Dashboard}>
        <div className={classes.PhotoEdit}>
          <div className={classes.ProfilePhoto}>
            <img src={this.props.data.avatar} alt="avatar" />
          </div>
          <button className={classes.PhotoPickerBtn}>Change Picture</button>
        </div>

        <div className={classes.DashboardForm}>
          <form
            onSubmit={this.onFormSubmit}
            className={classes.DashbordFormElements}
          >
            {formElements}
            <button type="submit" className={classes.SaveBtn}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditProfile: (profileData, token) =>
      dispatch(actions.editProfile(profileData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDashboard);
