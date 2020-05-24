import React from 'react';
import classes from './other-person-profile.module.css';
import About from './About/about.component';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/actions'
import { connect } from 'react-redux';

class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAbout: true
        }
    }

    componentDidMount() {
        this.props.onFetchProfile(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.OtherPersonProfile}>
                {this.props.profileData ? <div className={classes.ProfileData}>
                    <div className={classes.Avatar}>
                        <img src={this.props.profileData.user.avatar} alt="user-avatar" />
                    </div>
                    <div className={classes.Info}>
                        <div className={classes.NameHandle}>
                            <h2>{this.props.profileData.user.name}</h2>
                            <div className={classes.Handle}>
                                <i className="fas fa-at"></i>
                                <p>{this.props.profileData.handle}</p>
                            </div>
                        </div>
                        <div className={classes.Work}>
                            <i className="fas fa-briefcase"></i>
                            <p>{this.props.profileData.status} at {this.props.profileData.company}</p>
                        </div>
                        <div className={classes.Location}>
                            <i className="fas fa-map-marker-alt"></i>
                            <p>{this.props.profileData.location}</p>
                        </div>
                        <div className={classes.Buttons}>
                            <button className={classes.FollowBtn}>Follow</button>
                            <button className={classes.MessageBtn}>Message</button>
                        </div>
                    </div>

                </div> : <div className="ph-item">
                        <div className="ph-col-2">
                            <div className="ph-picture"></div>
                        </div>
                        <div className="ph-row">
                            <div className="ph-col-6"></div>

                            <div className="ph-col"></div>

                            <div className="ph-col"></div>
                            <div className="ph-col"></div>

                        </div>

                    </div>}

                <div className={classes.Tabs}>
                    <ul>
                        <li ><button className={`${classes.Active} ${classes.TabButton}`} onClick={() => this.setState({ showAbout: true })}>About</button></li>
                        <li><button className={classes.TabButton} >Posts</button></li>
                        <li><button className={classes.TabButton}>Github</button></li>
                    </ul>
                </div>
                {this.props.profileData ? <About {...this.props.profileData} /> : <div className="ph-item">
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row">
                            <div className="ph-col-6 big"></div>
                            <div className="ph-col-4 empty big"></div>
                            <div className="ph-col-2 big"></div>
                            <div className="ph-col-4"></div>
                            <div className="ph-col-8 empty"></div>
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileData: state.profile.otherPersonProfile
    }
}

const mapDispatchToProfile = (dispatch) => {
    return {
        onFetchProfile: (userId) => dispatch(actions.fetchOtherPersonProfile(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProfile)(withRouter(OtherPersonProfile));
