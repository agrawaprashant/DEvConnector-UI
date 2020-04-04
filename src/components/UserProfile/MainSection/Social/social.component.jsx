import React from "react";
import classes from "./social.module.css";
import Aux from "../../../../hoc/Auxilliary/auxilliary";
import AddSocial from "../../../../containers/UserProfile/AddSocial/add-social.component";

const social = props => {
  let social = <AddSocial />;
  if (props.data) {
    let socialLinkArray = [];
    for (let social in props.data.social) {
      socialLinkArray.push(social);
    }
    social = (
      <div className={classes.Social}>
        <ul>
          {socialLinkArray.map(social => {
            switch (social) {
              case "twitter":
                return (
                  <li>
                    <a href={props.data.social[social]}>
                      <i class="fab fa-twitter-square"></i>
                    </a>
                  </li>
                );
              case "facebook":
                return (
                  <li>
                    <a href={props.data.social[social]}>
                      <i class="fab fa-facebook-square"></i>
                    </a>
                  </li>
                );
              case "instagram":
                return (
                  <li>
                    <a href={props.data.social[social]}>
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                );
              case "linkedin":
                return (
                  <li>
                    <a href={props.data.social[social]}>
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                );
              case "youtube":
                return (
                  <li>
                    <a href={props.data.social[social]}>
                      <i class="fab fa-youtube"></i>
                    </a>
                  </li>
                );
              default:
                return null;
            }
          })}
        </ul>
        <button className={classes.EditSocialBtn}>Edit Social Links</button>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      <p>Social Links</p>
      {social}
    </div>
  );
};

export default social;
