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
    error: null,
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

    this.setState({ loginForm: updatedForm, error: null });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.setError
    );
  };

  setError = (error) => {
    this.setState({ error: error });
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
      <div className={classes.Container}>
        <div className={classes.Login}>
          <div className={classes.LoginForm}>
            <p>Login to your account!</p>
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <button type="submit" className={classes.LoginBtn}>
                Login
              </button>
            </form>
            {redirect}
            <h3>Or</h3>
          </div>

          <div className={classes.OAuthLoginBox}>
            <p>Login with</p>
            <div className={classes.AlternateLoginOptions}>
              <button className={classes.GoogleBtn}>
                {/* <i className="fab fa-google"></i> */}
              </button>
              <button className={classes.FacebookBtn}>
                {/* <i className="fab fa-facebook-f"></i> */}
              </button>
              <button className={classes.LinkedinBtn}>
                {/* <i className="fab fa-linkedin-in"></i> */}
              </button>
            </div>
          </div>
          {this.state.error ? (
            <p className={classes.ErrorMessage}>{this.state.error}</p>
          ) : null}
        </div>
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
    onLogin: (email, password, callback) =>
      dispatch(actions.login(email, password, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
