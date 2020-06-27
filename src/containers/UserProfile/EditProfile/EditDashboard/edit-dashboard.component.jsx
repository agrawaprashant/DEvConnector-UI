import React from "react";
import {
  updateObject,
  buildFormControl,
  checkMimeType,
} from "../../../../shared/utility";
import {
  checkValidity,
  checkFormValidity,
} from "../../../../shared/checkInputValidity";
import InputWithIcon from "../../../../components/UI/InputWithIcon/input-icon.component";
import classes from "./edit-dashboard.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/actions";
import AlertMessage from "../../../../components/UI/AlertMessage/alert-message.component";
import Aux from "../../../../hoc/Auxilliary/auxilliary";
import Spinner from "../../../../components/UI/SmallSpinner/small-spinner.component";
import SmallSpinner from "../../../../components/UI/SmallSpinner/small-spinner.component";

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
        { required: true },
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
        { required: true },
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
        { required: true },
        { iconClass: "far fa-id-badge" }
      ),
    },
    selctedProfilePicture: null,
    isProfilePicChanging: false,
    showProfilePicAlert: false,
    loading: false,
    showDashboardEditAlert: false,
    isFormValid: false,
    isMimeTypeValid: null,
    showMimeError: false,
  };

  componentDidMount = () => {
    this.setState({ isFormValid: checkFormValidity(this.state.dashBoardForm) });
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

    this.setState({
      dashBoardForm: updatedForm,
      isFormValid: checkFormValidity(updatedForm),
    });
  };

  onSelectProfilePic = () => {
    const file = this.state.selctedProfilePicture.file;
    const formData = new FormData();
    formData.append("profile-picture", file);
    if (this.state.isMimeTypeValid) {
      this.props.onChangeProfile(
        this.props.token,
        formData,
        this.profilePicChangeCallback
      );
      this.setState({ isProfilePicChanging: true });
    }
  };

  profilePicChangeCallback = () => {
    this.setState({
      isProfilePicChanging: false,
      showProfilePicAlert: true,
      selctedProfilePicture: null,
    });
  };

  alertCloseHandler = () => {
    this.setState({
      showProfilePicAlert: false,
      showDashboardEditAlert: false,
      showMimeError: false,
    });
    clearTimeout();
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    let userEnterdData = {};
    for (let key in this.state.dashBoardForm) {
      const value = this.state.dashBoardForm[key].value;
      if (value && value.trim().length !== 0) {
        userEnterdData[key] = value;
      }
    }

    this.props.onEditProfile(
      userEnterdData,
      this.props.token,
      this.dashBoardEditCallback
    );
    this.setState({ loading: true });
  };

  dashBoardEditCallback = () => {
    this.setState({ loading: false, showDashboardEditAlert: true });
  };

  profilePictureChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      checkMimeType(file, (isValid) => {
        if (!isValid) {
          this.setState({
            isMimeTypeValid: isValid,
            showMimeError: !isValid,
          });
        } else {
          const imgUrl = URL.createObjectURL(file);
          this.setState({
            selctedProfilePicture: { imgUrl, file },
            isMimeTypeValid: true,
          });
        }
      });
    }
    event.target.value = null;
  };

  render() {
    if (
      this.state.showProfilePicAlert ||
      this.state.showDashboardEditAlert ||
      this.state.showMimeError
    ) {
      setTimeout(() => {
        this.alertCloseHandler();
      }, 6000);
    }
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
      <Aux>
        {this.state.showAlert ? (
          <div className={classes.AlertBox}>
            <AlertMessage
              message="Profile picture changed successfully!"
              closed={this.alertCloseHandler}
              type="success"
            />
          </div>
        ) : null}
        {this.state.showDashboardEditAlert ? (
          <div className={classes.AlertBox}>
            <AlertMessage
              message="Profile updated!"
              closed={this.alertCloseHandler}
              type="success"
            />
          </div>
        ) : null}
        {this.state.showMimeError ? (
          <div className={classes.AlertBox}>
            <AlertMessage
              message="Invalid file type! Please choose a jpeg or a png file."
              closed={this.alertCloseHandler}
              type="error"
            />
          </div>
        ) : null}
        <div className={classes.Dashboard}>
          <div className={classes.PhotoEdit}>
            <div className={classes.ProfilePhoto}>
              {this.state.isProfilePicChanging ? (
                <Spinner />
              ) : (
                <img
                  src={
                    this.state.selctedProfilePicture
                      ? this.state.selctedProfilePicture.imgUrl
                      : this.props.data.avatar
                  }
                  alt="avatar"
                />
              )}
            </div>
            {this.state.selctedProfilePicture && this.state.isMimeTypeValid ? (
              <div className={classes.SelectImageButtons}>
                <button
                  onClick={() => this.onSelectProfilePic()}
                  className={classes.SavePicBtn}
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  onClick={() => this.setState({ selctedProfilePicture: null })}
                  className={classes.DiscardPicBtn}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  document.getElementById("profilePicPicker").click()
                }
                className={classes.PhotoPickerBtn}
              >
                Change Picture
              </button>
            )}
            <input
              type="file"
              id="profilePicPicker"
              style={{ display: "none" }}
              onChange={(event) => this.profilePictureChangeHandler(event)}
            />
          </div>

          <div className={classes.DashboardForm}>
            <form
              onSubmit={this.onFormSubmit}
              className={classes.DashbordFormElements}
            >
              {formElements}
              <button
                disabled={!this.state.isFormValid}
                type="submit"
                className={classes.SaveBtn}
              >
                {this.state.loading ? <SmallSpinner /> : `Save`}
              </button>
            </form>
          </div>
        </div>
      </Aux>
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
    onEditProfile: (profileData, token, callback) =>
      dispatch(actions.editProfile(profileData, token, callback)),
    onChangeProfile: (token, profilePicData, callback) =>
      dispatch(actions.changeProfilePicture(token, profilePicData, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDashboard);
