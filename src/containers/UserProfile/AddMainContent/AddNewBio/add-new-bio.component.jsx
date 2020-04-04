import React from "react";
import { buildFormControl, updateObject } from "../../../../shared/utility";
import { checkValidity } from "../../../../shared/checkInputValidity";
import classes from "./add-new-bio.module.css";
import Input from "../../../../components/UI/Input/input.component";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/actions";
class AddNewBio extends React.Component {
  state = {
    addBioForm: {
      bio: buildFormControl(
        "input",
        { placeholder: "Enter Bio", type: "text" },
        { value: "" },
        { required: true }
      )
    }
  };

  inputChangedHandler = event => {
    const updatedBio = updateObject(this.state.addBioForm.bio, {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.addBioForm.bio.validationRules
      ),
      touched: true
    });

    const updatedForm = updateObject(this.state.addBioForm, {
      bio: updatedBio
    });

    this.setState({ addBioForm: updatedForm });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const bioData = {
      bio: this.state.addBioForm.bio.value
    };
    this.props.onAddBio(this.props.token, bioData);
  };

  render() {
    let formControl = (
      <Input
        elementType={this.state.addBioForm.bio.elementType}
        elementConfig={this.state.addBioForm.bio.elementConfig}
        value={this.state.addBioForm.bio.value}
        valid={this.state.addBioForm.bio.valid}
        touched={this.state.addBioForm.bio.touched}
        changed={this.inputChangedHandler}
      />
    );
    return (
      <form onSubmit={this.formSubmitHandler} className={classes.BioForm}>
        {formControl} <button>Save</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddBio: (token, bioData) => dispatch(actions.addBio(token, bioData))
  };
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewBio);
