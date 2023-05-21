import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authentication';
import Logo from "../home-pages/Logo";
const userLogout = require('../../image/icon-logout-512.png');


const logo = require('../../image/dove.jpg');


class Navbar extends Component {
    static propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.shape({
            isAuthenticated:PropTypes.bool.isRequired,
            user:PropTypes.shape({
                image:PropTypes.string,
                name:PropTypes.string,
                id:PropTypes.string,
            })
        })
    };
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <div className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={userLogout} alt={user.name}
                    style={{ width: '25px', marginRight: '5px'}} />
                    Выйти
                </div>
            </ul>
        );
        const guestLinks = (
                <ul className="navbar-nav ml-auto">
                    <li className='nav-item'>
                        <Link className="nav-link" to="/register">Регестрация</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-link" to="/login">Войти</Link>
                    </li>
                </ul>
        );
        return(
            <nav className="header navbar navbar-expand-lg bg-body-tertiary justify-content-between p-3">
                <Link className="navbar-brand" to="/">
                    <div className='row'>
                    <div className='col-6'>
                        <Logo url={logo}/>
                    </div>
                    <div className='col-5 d-flex justify-content-start align-items-end pl-0 ml-1'>
                        <h4 className='text-info'>Dove</h4>
                    </div>
                </div>
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));