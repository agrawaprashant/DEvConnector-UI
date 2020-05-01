import React from "react";
import Input from "../../../components/UI/Input/input.component";
import classes from "./login.module.css";
import { updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/actions";

class Login extends React.Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your registered email",
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
          placeholder: "Enter your password",
        },
        value: "",
        valid: false,
        validationRules: {
          required: true,
        },
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, control) => {
    let valid = checkValidity(
      event.target.value,
      this.state.loginForm[control].validationRules
    );

    let updatedControl = updateObject(this.state.loginForm[control], {
      value: event.target.value,
      touched: true,
      valid: valid,
    });

    let updatedForm = updateObject(this.state.loginForm, {
      [control]: updatedControl,
    });

    this.setState({ loginForm: updatedForm });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value
    );
  };
  render() {
    let redirect = null;
    if (this.props.isAuthenticated) redirect = <Redirect to="/" />;
    const loginFormControls = [];
    for (let control in this.state.loginForm) {
      loginFormControls.push({
        controlName: control,
        elementType: this.state.loginForm[control].elementType,
        elementConfig: this.state.loginForm[control].elementConfig,
        value: this.state.loginForm[control].value,
        valid: this.state.loginForm[control].valid,
        touched: this.state.loginForm[control].touched,
      });
    }

    let form = loginFormControls.map((control) => {
      return (
        <Input
          key={control.controlName}
          elementType={control.elementType}
          elementConfig={control.elementConfig}
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
      <div className={classes.LoginForm}>
        <p>Login to your account!</p>
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <button type="submit" className={classes.LoginBtn}>
            Login
          </button>
        </form>
        {redirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
