import React from "react";
import classes from "./main-section.module.css";
import Social from "./Social/social.component";
import MainContent from "./MainContent/main-content.component";
import Github from "./GitHub/github-repo.component";

const MainSection = (props) => {
  return (
    <main className={classes.ProfileContent}>
      <section className={classes.SideBar}>
        <div className={classes.Connections}>
          <ul>
            <li>
              <p>Followers ({props.data.followers.length})</p>
            </li>
            <li>
              <p>Following ({props.data.following.length})</p>
            </li>
          </ul>
        </div>
        <div className={classes.Social}>
          <Social data={props.data.social} />
        </div>
      </section>
      <section className={classes.MainContent}>
        <MainContent data={props.data.mainContentData} />
      </section>
      <section className={classes.GithubRepository}>
        <Github data={props.data.githubusername} />
      </section>
    </main>
  );
};

export default MainSection;
