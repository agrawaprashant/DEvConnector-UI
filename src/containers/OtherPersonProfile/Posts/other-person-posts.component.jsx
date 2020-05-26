import React, { Component } from 'react';
import * as actions from '../.././../store/actions/actions';
import { connect } from 'react-redux';
import classes from './other-person-posts.module.css';
import Spinner from '../../../components/UI/Spinner/spinner.component'
import Post from '../../Posts/Post/post.component';

class OtherPersonPosts extends Component {
    componentDidMount() {
        this.props.onFetchPosts(this.props.userId);
    }
    render() {
        let posts = <Spinner />;
        if (this.props.posts) {
            if (this.props.posts.length !== 0) {
                posts = this.props.posts.map(post => {
                    return <Post postData={post} key={post._id} />
                })
            } else {
                posts = <div className={classes.MessageBox}>
                    <h3 className={classes.Message}>User has not posted anything!</h3>
                </div>
            }
        }
        return posts

    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.userPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPosts: (userId) => dispatch(actions.fetchUserPosts(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherPersonPosts);
