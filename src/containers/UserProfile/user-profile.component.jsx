import React from "react";
import classes from "./user-profile.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import store from "../../store/store";

class UserProfile extends React.Component {
  componentDidMount() {
    console.log(store.getState().token);
    this.props.onFetchProfile(this.props.token);
  }

  render() {
    return (
      <div className={classes.Container}>
        <header className={classes.Header}>
          <div className={classes.ProfilePic}>
            <img src={this.props.avatar} alt="avatar" />
          </div>
          <div className={classes.UserDetails}>
            <h3>Prashant Agrawal</h3>
            <div className={classes.CompanyLocation}>
              <div className={classes.Company}>
                <i class="fas fa-briefcase"></i>
                <p>System Engineer at Infosys</p>
              </div>
              <div className={classes.Location}>
                <i class="fas fa-map-marker-alt"></i>
                <p>Bangalore, Karnataka</p>
              </div>
            </div>
            <div className={classes.Skills}>
              <label>Skills:</label>
              <p>Java,Node.js,React,Angular</p>
            </div>
            <div className={classes.Education}>
              <label htmlFor="Education">Education:</label>
              <p>SRM University</p>
            </div>
          </div>
          <div className={classes.EditBtn}>
            <button>Edit Profile</button>
          </div>
        </header>
        <main className={classes.ProfileContent}>
          <section className={classes.SideBar}>
            <div className={classes.Connections}>
              <ul>
                <li>
                  <a href="#">Followers</a>
                </li>
                <li>
                  <a href="#">Following</a>
                </li>
              </ul>
            </div>
            <div className={classes.Social}>
              <p>Social Links</p>
              <ul>
                <li>
                  <a href="#">
                    <i class="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-quora"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.ProfileLink}>
              <h4>Profile Link</h4>
              <p>http://www.hackerearth.com/@prashant815</p>
            </div>
          </section>
          <section className={classes.MainContent}>
            <div className={classes.TechSkillsDetails}>
              <h4 className={classes.Heading}>Technical Skills</h4>
              <div className={classes.BoxContent}>
                <p>
                  Node.js, Java, React, Angular, JavaScript, MonogDB, MySQL,
                  Data Structures and Algorithms
                </p>
              </div>
            </div>
            <div className={classes.WorkExpDetails}>
              <h4 className={classes.Heading}>Work Experience</h4>
              <div className={classes.BoxContent}>
                <h3>Systems Engineer</h3>
                <p>Infosys, Bangalore, Karnataka, India</p>
                <small>Aug 2018 - Present (1 year and 8 months)</small>
              </div>
            </div>
            <div className={classes.EducationDetails}>
              <h4 className={classes.Heading}>Education</h4>
              <div className={classes.BoxContent}>
                <h3>SRM University</h3>
                <p>Bachelor of Technology (B.Tech.), Software Engineering</p>
                <small>2014 - 2018</small>
                <br />
                <div className={classes.CGPA}>
                <label htmlFor="cgpa">CGPA:</label>
                <p>8/10</p>
                </div>
                
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    name: state.auth.user.name,
    avatar: state.auth.user.avatar,
    email: state.auth.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: token => dispatch(actions.fetchUser(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
