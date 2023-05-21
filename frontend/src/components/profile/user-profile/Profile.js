import React from "react";
import PropTypes from 'proptypes';
import FormEditUserProfile from "./FormEditUserProfile";
import UserProfileInfo from "../UserProfileInfo";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {getUserProfile} from '../../../actions/switchInfoBlock';

class Profile extends React.PureComponent {
    state = {
        formEdit: false,
        errors: {}
    };
    static propTypes = {
        profile: PropTypes.shape({
            firstName:PropTypes.string.isRequired,
            lastName:PropTypes.string.isRequired,
            gender:PropTypes.string.isRequired,
            profession:PropTypes.string.isRequired,
            aboutSelf:PropTypes.string,
            search:PropTypes.string,
            age:PropTypes.number.isRequired,
            imagePath:PropTypes.string.isRequired
        }),
        errors:PropTypes.object.isRequired,
        formIsValid:PropTypes.bool.isRequired,

    };

    handleOpenForm = () => {
        this.setState({formEdit: true});
    };
    handleCloseForm = () => {
        this.setState({formEdit: false});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.formIsValid === true) {
            this.handleCloseForm();
        }
    }

    render() {
        const profile = this.props.profile;
        const {errors} = this.state;
  
        return (
            <div className='col-9 height-600'>
                <div className="col">
                    <div className='row'>
                        <div className='col-4'><img src={profile.imagePath} style={{}} alt='' className={'rounded w-100'}/>
                            <p>Ваше фото</p>
                        </div>
                        <div className='col'>
                            {(this.state.formEdit) ?
                                (<FormEditUserProfile profile={profile}
                                                      closeForm={this.handleCloseForm}
                                                      errors={errors}/>)
                                :
                                (
                                    <div className="d-flex flex-column-reverse align-items-start">
                                        <UserProfileInfo profile={profile}/>
                                        <button type="submit" className="btn btn-primary float-lg-right btn-sm align-self-end"
                                                onClick={this.handleOpenForm}>Редактировать профиль
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.blockUserInfo.profile,
    errors: state.errors,
    formIsValid: state.formIsValid
});


export default connect(mapStateToProps, {getUserProfile})(withRouter(Profile));