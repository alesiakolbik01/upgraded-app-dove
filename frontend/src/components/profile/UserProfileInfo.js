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
                <div >
                    <div className="col text-primary text-truncate ">
                        <strong className='text-capitalize'>{`${profile.firstName} ${profile.lastName}`}</strong>
                        {(profile.age) ? (" , " + profile.age) : null} </div>
                </div>
                <div >
                    <div className="col text-muted text-truncate">{(profile.gender)?('Пол: ' + profile.gender) : null}</div>
                </div>
                <div>
                    <div
                        className="col text-muted">{('Работа, обучение: ' + profile.profession) || null}</div>
                </div>
                <div className="mt-2">
                    <div className="col">Личная информация:
                        <div >
                            <div
                                className="col text-secondary">{(profile.aboutSelf) ? ("О себе: " + profile.aboutSelf) : null}</div>
                        </div>
                        <div >
                            <div
                                className="col text-secondary"> {("Я ищу: " + profile.search) || null}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserProfileInfo;
