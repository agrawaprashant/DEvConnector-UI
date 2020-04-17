import React from "react";
import { buildFormControl, updateObject } from "../../../../shared/utility";
import { checkValidity } from "../../../../shared/checkInputValidity";
import classes from "./add-new-work.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../components/UI/Spinner/spinner.component";
import * as actions from "../../../../store/actions/actions";

class AddNewWork extends React.Component {
  state = {
    addWorkForm: {
      title: buildFormControl(
        "input",
        { type: "text", placeholder: "Title" },
        { value: "" },
        { required: true }
      ),
      company: buildFormControl(
        "input",
        { type: "text", placeholder: "Company" },
        { value: "" },
        { required: true }
      ),
      location: buildFormControl(
        "input",
        { type: "text", placeholder: "Location" },
        { value: "" },
        {}
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
      current: buildFormControl(
        "input",
        { type: "checkbox", placeholder: "Cuurrent" },
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
  };

  isCurrentWork = false;
  inputChangedHandler = (event, control) => {
    const updatedControl = updateObject(this.state.addWorkForm[control], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.addWorkForm[control].validationRules
      ),
    });

    const updatedForm = updateObject(this.state.addWorkForm, {
      [control]: updatedControl,
    });

    if (control === "current") {
      this.isCurrentWork = !this.isCurrentWork;
    }
    if (this.isCurrentWork) {
      updatedForm.to.value = null;
    }
    updatedForm.current.value = this.isCurrentWork;

    this.setState({ addWorkForm: updatedForm });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    let workData = {
      title: this.state.addWorkForm.title.value,
      company: this.state.addWorkForm.company.value,
      location: this.state.addWorkForm.location.value,
      from: this.state.addWorkForm.from.value,
      to: this.state.addWorkForm.to.value,
      current: this.state.addWorkForm.current.value,
      description: this.state.addWorkForm.description.value,
    };

    this.props.onAddWork(this.props.token, workData);
  };

  render() {
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.formSubmitHandler} className={classes.AddWorkForm}>
          <div className={classes.FormGroup}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              value={this.state.addWorkForm.title.value}
              onChange={(event) => this.inputChangedHandler(event, "title")}
              className={[
                !this.state.addWorkForm["title"].valid &&
                this.state.addWorkForm["title"].touched
                  ? classes.Invalid
                  : null,
                classes.FormControl,
              ].join(" ")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label htmlFor="company">Company*</label>
            <input
              type="text"
              value={this.state.addWorkForm.company.value}
              onChange={(event) => this.inputChangedHandler(event, "company")}
              className={[
                !this.state.addWorkForm["company"].valid &&
                this.state.addWorkForm["company"].touched
                  ? classes.Invalid
                  : null,
                classes.FormControl,
              ].join(" ")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              value={this.state.addWorkForm.location.value}
              onChange={(event) => this.inputChangedHandler(event, "location")}
              className={[
                !this.state.addWorkForm["location"].valid &&
                this.state.addWorkForm["location"].touched
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
                  !this.state.addWorkForm["from"].valid &&
                  this.state.addWorkForm["from"].touched
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
              {!this.isCurrentWork ? (
                <select
                  onChange={(event) => this.inputChangedHandler(event, "to")}
                  className={[
                    !this.state.addWorkForm["to"].valid &&
                    this.state.addWorkForm["to"].touched
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
              ) : (
                <p style={{ display: "inline" }}>Present</p>
              )}
            </div>
            <label htmlFor="current">
              <input
                type="checkbox"
                name="current"
                onChange={(event) => this.inputChangedHandler(event, "current")}
              />
              I am currently working here
            </label>
            <div className={classes.FormGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                name="descripion"
                cols="30"
                rows="5"
                value={this.state.addWorkForm.description.value}
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
            <button className={classes.SaveButton}>Save</button>
          </div>
        </form>
      );
    }
    return form;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWork: (token, workData) =>
      dispatch(actions.addExperience(token, workData)),
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
)(withRouter(AddNewWork));
