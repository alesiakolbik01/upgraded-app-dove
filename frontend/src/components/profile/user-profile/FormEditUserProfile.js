import React from "react";
import PropTypes from 'proptypes';
import connect from "react-redux/es/connect/connect";
import {updateUserProfile} from '../../../actions/switchInfoBlock';
import {withRouter} from "react-router-dom";
import classnames from "classnames";

class FormEditUserProfile extends React.Component {
   constructor() {
        super();
        this.state = {
            image: null
        };
    };
    static propTypes = {
        updateUserProfile: PropTypes.func.isRequired,
        errors: PropTypes.object,
        closeForm:PropTypes.func.isRequired,
        profile:PropTypes.shape({
            firstName:PropTypes.string.isRequired,
            lastName:PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            gender: PropTypes.string.isRequired,
            profession: PropTypes.string.isRequired,
            aboutSelf: PropTypes.string.isRequired,
            search: PropTypes.string.isRequired
        })
    };

    handleFileSelect =(event) =>{
        this.setState({image: event.target.files[0]})
    };

    handleClickSubmit = (e) => {
        e.preventDefault();
        const userData = {
            firstName:this.userFirstName.value,
            lastName:this.userLastName.value,
            age: this.userAge.value,
            gender: this.userGender.value,
            profession: this.userProf.value,
            aboutSelf: this.userAboutText.value,
            search: this.userSearch.value
        };
        const formData = new FormData();
        if(this.state.image){
            formData.append('file',  this.state.image, this.state.image.name);
        }
        formData.append('profile', JSON.stringify(userData));
        this.props.updateUserProfile(this.props.profile._id, formData);
    };
    handleCloseForm = ()=>{
        this.props.closeForm();
    };

    render() {
        const user = this.props.profile || {};
        const { errors } = this.props;
        console.log(errors);
        return (
                <form>
                    <div className="form-group">
                        <label htmlFor="inputName">Укажите Ваше имя</label>
                        <input defaultValue={user.firstName || ''} type="text"
                               className={classnames('form-control', {
                                   'is-invalid': errors.firstName
                               })}
                               id="inputName" ref={(input) => {this.userFirstName = input}}/>
                        {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLastName">Укажите Вашу Фамилию</label>
                        <input defaultValue={user.lastName || ''} type="text"
                               className={classnames('form-control', {
                                   'is-invalid': errors.lastName
                               })}
                               id="inputLastName" ref={(input) => {this.userLastName = input}}/>
                        {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAge">Укажите Ваш возраст</label>
                        <input defaultValue={user.age || ''} type="number" min='18' max='100'
                               className={classnames('form-control', {
                                   'is-invalid': errors.age
                               })}
                               id="inputAge" ref={(input) => {this.userAge = input}}/>
                        {errors.age && (<div className="invalid-feedback">{errors.age}</div>)}

                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGender">Пол</label>
                        <select id="inputGender" defaultValue={user.gender || ''}
                                className="form-control"
                                ref={(input) => {this.userGender = input}}>
                            <option>...</option>
                            <option>Женский</option>
                            <option>Мужской</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputProf">Кем Вы работаете</label>
                        <input type="text" defaultValue={user.profession || ''}
                               className={classnames('form-control', {
                                   'is-invalid': errors.profession
                               })}
                               id="inputProf"
                               ref={(input) => {this.userProf = input}}/>
                        {errors.profession && (<div className="invalid-feedback">{errors.profession}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">Расскажите о себе...</label>
                        <textarea defaultValue={user.aboutSelf} className="form-control" id="about" rows="3" ref={(input) => {this.userAboutText = input}}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSearch">Кого Вы хотите найти:</label>
                        <select id="inputSearch" defaultValue={user.search || ''} className="form-control"
                                ref={(input) => {
                                    this.userSearch = input
                                }}>
                            <option>Женщину</option>
                            <option>Мужчину</option>
                            <option>Друга</option>
                        </select>
                    </div>
                    <div className="form-group custom-file">
                        <input type="file"
                               multiple
                               className={classnames('custom-file-input', {
                                   'is-invalid': errors.image
                               })}
                               id="inputImage"
                               accept='image/*,image/jpeg'
                               aria-describedby="inputGroupFileAddon04"
                               onChange={ this.handleFileSelect}/>
                        <label className="custom-file-label" htmlFor="inputImage">Выбрать фото</label>
                        {errors.image && (<div className="invalid-feedback">{errors.image}</div>)}
                    </div>
                    <div className="form-group custom-file mt-3">
                    <button type="submit" className="btn btn-primary mr-3 btn-sm" onClick={this.handleClickSubmit}>Отправить</button>
                    <button className="btn btn-outline-primary btn-sm" onClick={this.handleCloseForm}>Отмена</button>
                    </div>
                </form>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {updateUserProfile})(withRouter(FormEditUserProfile));