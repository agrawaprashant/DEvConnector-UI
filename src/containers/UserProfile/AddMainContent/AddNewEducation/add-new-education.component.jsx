import React from "react";
import { buildFormControl, updateObject } from "../../../../shared/utility";
import {
  checkValidity,
  checkFormValidity,
} from "../../../../shared/checkInputValidity";
import classes from "./add-new-education.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../components/UI/Spinner/spinner.component";
import * as actions from "../../../../store/actions/actions";

class AddNewEducation extends React.Component {
  state = {
    addEducationForm: {
      school: buildFormControl(
        "input",
        { type: "text", placeholder: "School" },
        { value: "" },
        { required: true }
      ),
      degree: buildFormControl(
        "input",
        { type: "text", placeholder: "Degree" },
        { value: "" },
        { required: true }
      ),
      fieldofstudy: buildFormControl(
        "input",
        { type: "text", placeholder: "Field of Study" },
        { value: "" },
        { required: true }
      ),
      from: buildFormControl(
        "select",
        { type: "select", placeholder: "From" },
        { value: "" },
        { required: true }
      ),
      to: buildFormControl(
        "select",
        { type: "select", placeholder: "To" },
        { value: "" },
        {}
      ),
      description: buildFormControl(
        "textarea",
        { type: "textarea", placeholder: "Description" },
        { value: "" },
        {}
      ),
    },
    isFormValid: false,
  };
  inputChangedHandler = (event, control) => {
    const updatedControl = updateObject(this.state.addEducationForm[control], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.addEducationForm[control].validationRules
      ),
    });

    const updatedForm = updateObject(this.state.addEducationForm, {
      [control]: updatedControl,
    });

    this.setState({
      addEducationForm: updatedForm,
      isFormValid: checkFormValidity(updatedForm),
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    let educationData = {
      school: this.state.addEducationForm.school.value,
      degree: this.state.addEducationForm.degree.value,
      fieldofstudy: this.state.addEducationForm.fieldofstudy.value,
      from: this.state.addEducationForm.from.value,
      to: this.state.addEducationForm.to.value,
    };

    if (this.state.addEducationForm.description.value) {
      educationData.description = this.state.addEducationForm.description.value;
    }

    this.props.onAddEducation(this.props.token, educationData);
  };

  render() {
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form
          onSubmit={this.formSubmitHandler}
          className={classes.AddEducatioNForm}
        >
          <div className={classes.FormGroup}>
            <label htmlFor="school">School*</label>
            <input
              type="text"
              value={this.state.addEducationForm.school.value}
              onChange={(event) => this.inputChangedHandler(event, "school")}
              className={[
                !this.state.addEducationForm["school"].valid &&
                this.state.addEducationForm["school"].touched
                  ? classes.Invalid
                  : null,
                classes.FormControl,
              ].join(" ")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label htmlFor="degree">Degree*</label>
            <input
              type="text"
              value={this.state.addEducationForm.degree.value}
              onChange={(event) => this.inputChangedHandler(event, "degree")}
              className={[
                !this.state.addEducationForm["degree"].valid &&
                this.state.addEducationForm["degree"].touched
                  ? classes.Invalid
                  : null,
                classes.FormControl,
              ].join(" ")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label htmlFor="fieldofstudy">Field of Study*</label>
            <input
              type="text"
              value={this.state.addEducationForm.fieldofstudy.value}
              onChange={(event) =>
                this.inputChangedHandler(event, "fieldofstudy")
              }
              className={[
                !this.state.addEducationForm["fieldofstudy"].valid &&
                this.state.addEducationForm["fieldofstudy"].touched
                  ? classes.Invalid
                  : null,
                classes.FormControl,
              ].join(" ")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label htmlFor="duration">Duration*</label>
            <div className={classes.DurationBox}>
              <select
                onChange={(event) => this.inputChangedHandler(event, "from")}
                className={[
                  !this.state.addEducationForm["from"].valid &&
                  this.state.addEducationForm["from"].touched
                    ? classes.Invalid
                    : null,
                  classes.FormControl,
                ].join(" ")}
                defaultValue="a"
              >
                <option value="a" disabled>
                  -------
                </option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
              {" - "}
              <select
                onChange={(event) => this.inputChangedHandler(event, "to")}
                className={[
                  !this.state.addEducationForm["to"].valid &&
                  this.state.addEducationForm["to"].touched
                    ? classes.Invalid
                    : null,
                  classes.FormControl,
                ].join(" ")}
                defaultValue="b"
              >
                <option value="b" disabled>
                  -------
                </option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className={classes.FormGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                name="descripion"
                cols="30"
                rows="5"
                value={this.state.addEducationForm.description.value}
                onChange={(event) =>
                  this.inputChangedHandler(event, "description")
                }
              ></textarea>
            </div>
          </div>
          <div className={classes.Buttons}>
            <button
              type="button"
              onClick={this.props.cancel}
              className={classes.CancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!this.state.isFormValid}
              className={classes.SaveButton}
            >
              Save
            </button>
          </div>
        </form>
      );
    }
    return form;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEducation: (token, educationData) =>
      dispatch(actions.addEducation(token, educationData)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.profile.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewEducation));
