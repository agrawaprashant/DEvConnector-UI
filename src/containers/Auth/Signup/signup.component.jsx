import React from "react";
import Input from "../../../components/UI/Input/input.component";
import classes from "./signup.module.css";
import { updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { Link, Redirect } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    signUpForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Name",
        },
        value: "",
        valid: false,
        validationRules: {
          required: true,
        },
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Email",
        },
        value: "",
        valid: false,
        validationRules: {
          required: true,
          email: true,
        },
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password",
        },
        value: "",
        valid: false,
        validationRules: {
          required: true,
          minLength: 6,
        },
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, control) => {
    const valid = checkValidity(
      event.target.value,
      this.state.signUpForm[control].validationRules
    );
    const updatedControl = updateObject(this.state.signUpForm[control], {
      value: event.target.value,
      touched: true,
      valid: valid,
    });
    const updatedForm = updateObject(this.state.signUpForm, {
      [control]: updatedControl,
    });

    this.setState({ signUpForm: updatedForm });
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    this.props.onSignup(
      this.state.signUpForm.name.value,
      this.state.signUpForm.email.value,
      this.state.signUpForm.password.value
    );
  };

  render() {
    let redirect = null;
    if (this.props.isAuthenticated && this.props.user.name)
      redirect = <Redirect to="/profile" />;
    const signupFormElements = [];
    for (let key in this.state.signUpForm) {
      signupFormElements.push({
        controlName: key,
        elementType: this.state.signUpForm[key].elementType,
        elementConfig: this.state.signUpForm[key].elementConfig,
        value: this.state.signUpForm[key].value,
        valid: this.state.signUpForm[key].valid,
        touched: this.state.signUpForm[key].touched,
      });
    }

    let form = signupFormElements.map((control) => {
      return (
        <Input
          key={control.controlName}
          elementConfig={control.elementConfig}
          elementType={control.elementType}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          changed={(event) =>
            this.inputChangedHandler(event, control.controlName)
          }
        />
      );
    });
    return (
      <div className={classes.SignupForm}>
        <h3>Register for DevConnector!</h3>
        <form onSubmit={(event) => this.onSubmitForm(event)}>
          {form}
          <button type="submit" className={classes.SignupBtn}>
            Register
          </button>
        </form>

        <p>
          Already have an account ? <Link to="/login">Login Here</Link>
        </p>
        {redirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (name, email, password) =>
      dispatch(actions.register(name, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
