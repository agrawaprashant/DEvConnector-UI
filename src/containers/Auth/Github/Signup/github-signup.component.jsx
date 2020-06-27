import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/auth.actions";

import classes from "./github-signup.module.css";
import SmallSpinner from "../../../../components/UI/SmallSpinner/small-spinner.component";
import Logo from "../../../../assets/img/logo.png";
import {
  checkValidity,
  checkFormValidity,
} from "../../../../shared/checkInputValidity";
import { updateObject, buildFormControl } from "../../../../shared/utility";
import { Redirect } from "react-router-dom";

class GithubSignup extends React.Component {
  state = {
    githubSignupForm: {
      username: buildFormControl(
        "input",
        { type: "text", placeholder: "Enter username" },
        { value: "" },
        { required: true }
      ),
      password: buildFormControl(
        "input",
        { type: "password", placeholder: "Enter Password " },
        { value: "" },
        { required: true }
      ),
    },
    error: null,
    loading: false,
    isFormValid: false,
    githubOAuthCode: null,
  };

  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ githubOAuthCode: code });
    }
  }

  inputChangedHandler = (event, control) => {
    let valid = checkValidity(
      event.target.value,
      this.state.githubSignupForm[control].validationRules
    );

    let updatedControl = updateObject(this.state.githubSignupForm[control], {
      value: event.target.value,
      touched: true,
      valid: valid,
    });

    let updatedForm = updateObject(this.state.githubSignupForm, {
      [control]: updatedControl,
    });

    this.setState({
      githubSignupForm: updatedForm,
      error: null,
      isFormValid: checkFormValidity(updatedForm),
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSignUpViaGithub(
      this.state.githubSignupForm.username.value,
      this.state.githubSignupForm.password.value,
      this.state.githubOAuthCode,
      this.props.githubToken,
      this.setError
    );
    this.setState({ loading: true });
  };

  setError = (error) => {
    this.setState({ error: error, loading: false });
  };

  render() {
    let redirect;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to="/" />;
    }
    const { githubSignupForm } = this.state;
    const form = (
      <div className={classes.GithubSignUpForm}>
        <div className={classes.Form}>
          <img src={Logo} alt="logo" />
          <h2>Signup With Github</h2>
          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="user`name">Username</label>
              {githubSignupForm.username.valid &&
              githubSignupForm.username.touched ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
              {!githubSignupForm.username.valid &&
              githubSignupForm.username.touched ? (
                <div
                  style={{
                    color: "#d9534f",
                    display: "flex",
                  }}
                >
                  <span>
                    <p
                      style={{
                        fontSize: "11px",
                        paddingRight: "3px",
                        paddingTop: "2px",
                      }}
                    >
                      Please enter a username!
                    </p>
                  </span>
                  <span>
                    <i className="far fa-frown"></i>
                  </span>
                </div>
              ) : null}
            </div>
            <input
              value={githubSignupForm.username.value}
              onChange={(e) => this.inputChangedHandler(e, "username")}
              type="text"
              name="username"
              autoComplete="off"
            />
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="password">Password</label>
              {!githubSignupForm.password.valid &&
              githubSignupForm.password.touched ? (
                <div
                  style={{
                    display: "flex",
                    color: "#d9534f",
                  }}
                >
                  <span>
                    <p
                      style={{
                        fontSize: "10px",
                        paddingRight: "5px",
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
              {githubSignupForm.password.valid ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
            </div>
            <input
              value={githubSignupForm.password.value}
              onChange={(e) => this.inputChangedHandler(e, "password")}
              type="password"
              name="password"
              autoComplete="off"
            />
          </div>
          <button
            disabled={!this.state.isFormValid}
            onClick={this.formSubmitHandler}
            className={classes.SubmitBtn}
          >
            {!this.state.loading ? "Submit" : <SmallSpinner />}
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
        </div>
        {redirect}
      </div>
    );
    return form;
  }

  componentWillUnmount() {
    this.props.onSignUpViaGithubCancel();
  }
}

const mapStateToProps = (state) => {
  return {
    githubToken: state.auth.githubToken,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpViaGithub: (username, password, code, githubToken, callback) =>
      dispatch(
        actions.githubSignUp(username, password, code, githubToken, callback)
      ),
    onSignUpViaGithubCancel: () => dispatch(actions.githubSignUpCancelled()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubSignup);
