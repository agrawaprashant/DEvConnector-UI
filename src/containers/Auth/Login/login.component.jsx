import React from "react";
import classes from "./login.module.css";
import { updateObject, buildFormControl } from "../../../shared/utility";
import {
  checkValidity,
  checkFormValidity,
} from "../../../shared/checkInputValidity";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as actions from "../../../store/actions/actions";
import Spinner from "../../../components/UI/SmallSpinner/small-spinner.component";
import Logo from "../../../assets/img/logo.png";

class Login extends React.Component {
  state = {
    signInForm: {
      email: buildFormControl(
        "input",
        { type: "email", placeholder: "Enter email" },
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
  };

  inputChangedHandler = (event, control) => {
    let valid = checkValidity(
      event.target.value,
      this.state.signInForm[control].validationRules
    );

    let updatedControl = updateObject(this.state.signInForm[control], {
      value: event.target.value,
      touched: true,
      valid: valid,
    });

    let updatedForm = updateObject(this.state.signInForm, {
      [control]: updatedControl,
    });

    this.setState({
      signInForm: updatedForm,
      error: null,
      isFormValid: checkFormValidity(updatedForm),
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(
      this.state.signInForm.email.value,
      this.state.signInForm.password.value,
      this.setError
    );
    this.setState({ loading: true });
  };

  setError = (error) => {
    this.setState({ error: error, loading: false });
  };

  render() {
    let redirect = null;
    const { signInForm } = this.state;
    if (this.props.isAuthenticated) redirect = <Redirect to="/" />;

    let form = (
      <div className={classes.SignIn}>
        <img src={Logo} alt="logo" className={classes.Showcase} />
        <div className={classes.SignInForm}>
          <h2>Sign-in</h2>
          <p className={classes.LoginLink}>
            Don't have an account?
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
          <button className={classes.FacebookBtn}>
            <div className={classes.BtnContent}>
              <i className="fab fa-github fa-2x"></i> <p>Login via Github</p>
            </div>
          </button>

          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="email">Email</label>
              {signInForm.email.valid && signInForm.email.touched ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
              {!signInForm.email.valid && signInForm.email.touched ? (
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
              value={signInForm.email.value}
              onChange={(e) => this.inputChangedHandler(e, "email")}
              type="email"
              name="email"
            />
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.Label}>
              <label htmlFor="password">Password</label>
              {!signInForm.password.valid && signInForm.password.touched ? (
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
              {signInForm.password.valid ? (
                <span style={{ color: "#5cb85c" }}>
                  <i className="far fa-smile"></i>
                </span>
              ) : null}
            </div>
            <input
              value={signInForm.password.value}
              onChange={(e) => this.inputChangedHandler(e, "password")}
              type="password"
              name="password"
            />
          </div>
          <button
            disabled={!this.state.isFormValid}
            onClick={this.formSubmitHandler}
            className={classes.SubmitBtn}
          >
            {!this.state.loading ? "Login" : <Spinner />}
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
