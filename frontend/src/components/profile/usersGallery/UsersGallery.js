import React from "react";
import PropTypes from 'proptypes';
import ProfileInGallery from "./ProfileInGallery";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

class UsersGallery extends React.PureComponent {
    static propTypes = {
        profiles: PropTypes.arrayOf(
            PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                gender: PropTypes.string.isRequired,
                profession: PropTypes.string.isRequired,
                aboutSelf: PropTypes.string,
                search: PropTypes.string,
                age: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired
            })
        )
    };

    render() {
        const profiles = this.props.profiles.filter(user => {
            return user._id !== this.props.currentUserProfile._id
        });
        return (
            <div style={{position: 'relative'}} className='col-9 mb-2 height-600'>
                {
                    profiles.map(user => {
                        return <ProfileInGallery profile={user} key={user._id}/>;
                    })
                }
                <h5 className='text-center text-secondary text-uppercase mt-5 ml-5'>
                    Вы просмотрели всех пользователей</h5>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profiles: state.blockUserInfo.profiles,
    currentUserProfile: state.blockUserInfo.profile
});


export default connect(mapStateToProps)(withRouter(UsersGallery));