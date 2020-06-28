import React from "react";

import classes from "./github-repository-item.module.css";
import Moment from "react-moment";

const GithubRepositoryItem = ({
  name,
  description,
  language,
  updated_at,
  html_url,
}) => {
  return (
    <a
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.RepoItem}
    >
      <div className={classes.Header}>
        <h3>{name}</h3>
        {description ? (
          <p>
            {description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </p>
        ) : null}
      </div>
      <div className={classes.Footer}>
        <p>{language}</p>
        <p>
          Last updated <Moment fromNow>{updated_at}</Moment>
        </p>
      </div>
    </a>
  );
};

export default GithubRepositoryItem;
