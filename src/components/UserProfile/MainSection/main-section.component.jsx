import React from "react";
import classes from "./main-section.module.css";
import Social from "./Social/social.component";
import MainContent from "./MainContent/main-content.component";
import Github from "./GitHub/github-repo.component";

const mainArea = props => {
  console.log(props);
  return (
    <main className={classes.ProfileContent}>
      <section className={classes.SideBar}>
        <div className={classes.Connections}>
          <ul>
            <li>
              <a href="#">Followers (0)</a>
            </li>
            <li>
              <a href="#">Following (0)</a>
            </li>
          </ul>
        </div>
        <div className={classes.Social}>
          <Social data={props.data.social} />
        </div>
        <div className={classes.ProfileLink}>
          <h4>Profile Link</h4>
          <p>http://www.hackerearth.com/@prashant815</p>
        </div>
      </section>
      <section className={classes.MainContent}>
        <MainContent data={props.data.mainContentData} />
      </section>
      <section>
        <Github data={props.data.githubusername} />
      </section>
    </main>
  );
};

export default mainArea;
