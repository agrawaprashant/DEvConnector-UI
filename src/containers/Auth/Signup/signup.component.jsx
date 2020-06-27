import React from "react";
import classes from "./signup.module.css";
import { updateObject, buildFormControl } from "../../../shared/utility";
import {
  checkValidity,
  checkFormValidity,
} from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../assets/img/logo.png";
import Spinner from "../../../components/UI/SmallSpinner/small-spinner.component";
import * as config from "../../../config/app-config.json";

class SignUp extends React.Component {
  state = {
    signUpForm: {
      firstName: buildFormControl(
        "input",
        { type: "text", placeholder: "Enter first name " },
        { value: "" },
        { required: true }
      ),
      lastName: buildFormControl(
        "input",
        { type: "text", placeholder: "Enter last name" },
        { value: "" },
        { required: false }
      ),
      email: buildFormControl(
        "input",
        { type: "email", placeholder: "Enter your email" },
        { value: "" },
        { required: true }
      ),
      password: buildFormControl(
        "input",
        { type: "password", placeholder: "Enter password" },
        { value: "" },
        { required: true }
      ),
    },
    error: null,
    loading: false,
    isFormValid: false,
  };

  setError = (error) => {
    this.setState({ error: error, loading: false });
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

    this.setState({
      signUpForm: updatedForm,
      isFormValid: checkFormValidity(updatedForm),
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    this.props.onSignup(
      this.state.signUpForm.firstName.value +
        " " +
        this.state.signUpForm.lastName.value,
      this.state.signUpForm.email.value,
      this.state.signUpForm.password.value,
      this.setError
    );
    this.setState({ loading: true });
  };

  render() {
    const { signUpForm } = this.state;
    let redirect = null;
    if (this.props.isAuthenticated && this.props.user.name)
      redirect = <Redirect to="/profile" />;

    return (
      <div className={classes.Signup}>
        <img src={Logo} alt="logo" className={classes.Showcase} />
        <div className={classes.SignupForm}>
          <h2>Sign-up</h2>
          <p className={classes.LoginLink}>
            Already have an account?
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${config.githubOAuthClientID}
                    &redirect_uri=http://192.168.1.4:3000/github-signup`}
            className={classes.FacebookBtn}
          >
            <div className={classes.BtnContent}>
              <i className="fab fa-github fa-2x"></i> <p>Join via Github</p>
            </div>
          </a>
          <div className={classes.NameInput}>
            <div className={classes.FormGroup}>
              <div className={classes.Label}>
                <label htmlFor="firstName">First Name</label>
                {signUpForm.firstName.valid && signUpForm.firstName.touched ? (
                  <span style={{ color: "#5cb85c", paddingRight: "3px" }}>
                    <i className="far fa-smile"></i>
                  </span>
                ) : null}
                {!signUpForm.firstName.valid && signUpForm.firstName.touched ? (
                  <span style={{ color: "#d9534f", paddingRight: "3px" }}>
                    <i className="far fa-frown"></i>
                  </span>
                ) : null}
              </div>
              <input
                value={signUpForm.firstName.value}
                type="text"
                name="firstName"
                onChange={(e) => this.inputChangedHandler(e, "firstName")}
                htmlFor="firstName"
              />
            </div>
            <div className={classes.FormGroup}>
              <div className={classes.Label}>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <input
                value={signUpForm.lastName.value}
                onChange={(e) => this.inputChangedHandler(e, "lastName")}
                type="text"
                name="lastName"
              />
            </div>
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="email">Email</label>
              {signUpForm.email.valid && signUpForm.email.touched ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
              {!signUpForm.email.valid && signUpForm.email.touched ? (
                <div style={{ color: "#d9534f", display: "flex" }}>
                  <span>
                    <p
                      style={{
                        fontSize: "11px",
                        paddingRight: "3px",
                        paddingTop: "2px",
                      }}
                    >
                      Please enter a valid email!
                    </p>
                  </span>
                  <span>
                    <i className="far fa-frown"></i>
                  </span>
                </div>
              ) : null}
            </div>
            <input
              value={signUpForm.email.value}
              onChange={(e) => this.inputChangedHandler(e, "email")}
              type="email"
              name="email"
            />
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="password">Password</label>
              {!signUpForm.password.valid && signUpForm.password.touched ? (
                <div style={{ display: "flex", color: "#d9534f" }}>
                  <span>
                    <p
                      style={{
                        fontSize: "11px",
                        paddingRight: "3px",
                        paddingTop: "2px",
                      }}
                    >
                      Password must be 6 or more characters!
                    </p>
                  </span>
                  <span>
                    <i className="far fa-frown"></i>
                  </span>
                </div>
              ) : null}
              {signUpForm.password.valid ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
            </div>
            <input
              value={signUpForm.password.value}
              onChange={(e) => this.inputChangedHandler(e, "password")}
              type="password"
              name="password"
            />
          </div>
          <button
            disabled={!this.state.isFormValid}
            onClick={this.onSubmitForm}
            className={classes.SubmitBtn}
          >
            {!this.state.loading ? "Join Our Community" : <Spinner />}
          </button>
          {this.state.error ? (
            <p
              style={{
                color: "#d9534f",
                textAlign: "center",
                fontSize: "1.2rem",
                paddingTop: "1rem",
              }}
            >
              {this.state.error}
            </p>
          ) : null}
          <p className={classes.TermsText}>
            By joining, you agree to the{" "}
            <span className={classes.Bold}>Terms </span>
            and <span className={classes.Bold}>Privacy Policy</span>
          </p>
        </div>
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
    onSignup: (name, email, password, callback) =>
      dispatch(actions.register(name, email, password, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
