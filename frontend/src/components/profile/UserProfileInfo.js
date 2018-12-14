import React from 'react';
import PropTypes from 'proptypes';

class UserProfileInfo extends React.Component {
    static propTypes = {
        profile: PropTypes.shape({
            firstName:PropTypes.string.isRequired,
            lastName:PropTypes.string.isRequired,
            gender:PropTypes.string,
            profession:PropTypes.string.isRequired,
            aboutSelf:PropTypes.string,
            search:PropTypes.string,
            age:PropTypes.number.isRequired,
        })
    };

    render() {
        const profile = this.props.profile;
        return (
            <div className="col">
                <div className='row mt-1'>
                    <div className="col text-primary text-truncate text-center">
                        <strong className='text-capitalize'>{`${profile.firstName} ${profile.lastName}`}</strong>
                        {(profile.age) ? (" , " + profile.age) : null} </div>
                </div>
                <div className='row'>
                    <div className="col text-muted text-truncate text-center">{(profile.gender)?('Пол: ' + profile.gender) : null}</div>
                </div>
                <div className='row'>
                    <div
                        className="col text-muted text-center">{('Работа, обучение: ' + profile.profession) || null}</div>
                </div>
                <div className="row mt-2">
                    <div className="col text-center">Личная информация:
                        <div className="row">
                            <div
                                className="col text-secondary text-center">{(profile.aboutSelf) ? ("О себе: " + profile.aboutSelf) : null}</div>
                        </div>
                        <div className="row">
                            <div
                                className="col text-secondary text-center"> {("Я ищу: " + profile.search) || null}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserProfileInfo;
