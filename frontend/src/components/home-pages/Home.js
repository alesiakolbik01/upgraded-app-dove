import React, {Component} from 'react';
import PropTypes from 'proptypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import LoggedIn from '../profile/LoggedIn';
import {HomeDefaultPage} from './HomeDefaultPage.js';
import connect from "react-redux/es/connect/connect";
import {logoutUser} from "../../actions/authentication";
import {getUserProfile} from '../../actions/switchInfoBlock';
import {withRouter} from "react-router-dom";


class Home extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            isAuthenticated:PropTypes.bool.isRequired,
            user:PropTypes.shape({
                image:PropTypes.string,
                name:PropTypes.string,
                id:PropTypes.string,
            })
        }),
        getUserProfile:PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.auth = false;
    };

    render() {
        const {isAuthenticated} = this.props.auth;
        const homeAuth = (
            <LoggedIn/>
        );
        const homeDefault = (
            <HomeDefaultPage/>
        );
        return (
            (isAuthenticated) ?
                homeAuth :
                homeDefault
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {getUserProfile, logoutUser})(withRouter(Home));