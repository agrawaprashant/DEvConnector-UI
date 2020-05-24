import React from 'react'
import classes from './about.module.css';
import WorkExpCard from '../../UserProfile/MainSection/MainContent/Work/WorkExperienceCard/work-exp-card.component';
import EducationCard from '../../UserProfile/MainSection/MainContent/Education/EducationCard/education-card.component';


const About = (props) => {
    return (
        <div className={classes.About}>
            <div className={classes.SideBar}>
                <div className={classes.Connections}>
                    <ul>
                        <li><button>Following (10)</button></li>
                        <li><button>Followers (4)</button></li>
                    </ul>
                </div>
                <div className={classes.Social}>
                    <p>Social Links</p>
                    {props.social ? <ul>
                        <li><i className="fab fa-twitter-square"></i><a href="/">agrawaprashant</a></li>
                        <li><i className="fab fa-facebook-square"></i><a href="/">agrawaprashant</a></li>
                        <li><i className="fab fa-instagram"></i><a href="/">agrawaprashant</a></li>
                        <li><i className="fab fa-linkedin"></i><a href="/">agrawaprashant</a></li>
                        <li><i className="fab fa-youtube"></i><a href="/">agrawaprashant</a></li>
                    </ul> : <p style={{ color: "#da4f4a", fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginTop: "1rem" }}>No Social Links to show!</p>}
                </div>
            </div>
            <div className={classes.Main}>
                <div className={classes.Box}>
                    <h3 className={classes.Heading}>Bio</h3>
                    {props.bio ? <p className={classes.Bio}>{props.bio}</p> : <p style={{ color: "#da4f4a", fontStyle: "italic", fontWeight: "bold" }} className={classes.Bio}>No Bio to show!</p>}
                </div>
                <div className={classes.Box}>
                    <h3 className={classes.Heading}>Skills</h3>
                    {props.skills.length !== 0 ? <p className={classes.Skills}>{props.skills.join(', ')}</p> : <p style={{ color: "#da4f4a", fontStyle: "italic", fontWeight: "bold" }} className={classes.Skills} >No Skills to show!</p>}

                </div>
                <div className={classes.Box}>
                    <h3 className={classes.Heading}>Work</h3>
                    {props.experience.length !== 0 ? props.experience.map(exp => <WorkExpCard data={exp} key={exp._id} />) : <p style={{ color: "#da4f4a", fontStyle: "italic", fontWeight: "bold" }} className={classes.Skills}>No Work Experience to show!</p>}

                </div>
                <div className={classes.Box}>
                    <h3 className={classes.Heading}>Education</h3>
                    {props.education.length !== 0 ? props.education.map(edu => <EducationCard data={edu} key={edu._id} />) : <p style={{ color: "#da4f4a", fontStyle: "italic", fontWeight: "bold" }} className={classes.Skills}>No Education to show!</p>}
                </div>
            </div>
        </div>
    )
}

export default About
