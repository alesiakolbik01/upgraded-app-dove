import React from 'react';
import PropTypes from 'proptypes';
import {Link, withRouter} from 'react-router-dom';
import ContentBlock from './ContentBlock.js';
import connect from 'react-redux/es/connect/connect';
import {getUserProfile, getUsersGallery, getUsersList} from '../../actions/switchInfoBlock';
import {getUserConversations} from '../../actions/chat';
import {getLikes} from '../../actions/setLikeOnProfile';
import {Loading} from "./Loading";
import Modal from "./usersGallery/Modal";
const io = require('socket.io-client');


const socket = io.connect('http://example.com:3080'));

class LoggedIn extends React.Component {
    static propTypes = {
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string,
                _id: PropTypes.string
            })
        }),
        blockUserInfo: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        isModal: PropTypes.object.isRequired,
        getUserProfile: PropTypes.func.isRequired,
        getUsersList: PropTypes.func.isRequired,
        getUsersGallery: PropTypes.func.isRequired,
        getLikes:PropTypes.func.isRequired,
        getUserConversations:PropTypes.func.isRequired
    };

    componentDidMount(){
        if (this.props.auth) {
            this.props.getUserProfile(this.props.auth.user.id);
        }
    };

    handleClickNav = (e) => {
        e.preventDefault();
        let infoType = e.target.getAttribute('data-attr');
        switch (infoType) {
            case 'profile':
                this.props.getUserProfile(this.props.auth.user.id);
                break;
            case 'messages':
                this.props.getUsersList();
                break;
            case 'usersGallery':
                this.props.getUsersGallery();
                break;
            case 'userLikes':
                this.props.getLikes();
                break;
            default:
                return false;
        }
    };
    render() {
        const {blockUserInfo, profile} = this.props.blockUserInfo;
        const {isModal, name, gender} = this.props.isModal;
        let modal = null;
        if(isModal) {
            modal = <Modal name={name} gender={gender}/>;
        }
        if (profile) {
            return (
                <div className='container-fluid h-100 bg-lite-grey'>
                    { modal }
                    <div className='row pt-2 mb-5'>
                        <div className='col-3 bg-lite-grey text-truncate'>
                            <div className='row'>
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <img className='rounded-circle w-100'
                                         src={profile.image}
                                         alt='avatar'/>
                                </div>
                                <div className='col-6'>
                                    <h6 className='text-dark lead text-uppercase'>{profile.firstName}</h6>
                                    <Link to={'/profile/' + profile.user.name}>
                                        <button type="button" data-attr="profile" onClick={this.handleClickNav}
                                                className="btn btn-primary btn-sm">
                                            Мой профиль
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <div className='row'>
                                <div className='col-12'>
                                    <nav className="nav flex-column" onClick={this.handleClickNav}>
                                        <span className="nav-link text-truncate" data-attr="messages">Сообщения</span>
                                        <span className="nav-link text-truncate"
                                              data-attr="usersGallery">Знакомства</span>
                                        <span className="nav-link text-truncate"
                                              data-attr="userLikes">Вы понравились</span>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {(blockUserInfo) ?
                            <ContentBlock blockType={blockUserInfo} socket={socket}/> :
                            <Loading/>
                        }
                    </div>
                </div>)
        } else return (<Loading/>)
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    blockUserInfo: state.blockUserInfo,
    errors:state.errors,
    isModal: state.modal
});

export default connect(mapStateToProps, {
    getUserProfile,
    getUsersList,
    getUsersGallery,
    getLikes,
    getUserConversations
})(withRouter(LoggedIn));