import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import classnames from 'classnames';
import {ButtonSubmit} from '../buttons/ButtonSubmit.js';
class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            password_confirm: '',
            image:null,
            firstName:'',
            lastName:'',
            age:'',
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    };

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const firstName = this.state.firstName.trim();
        const lastName = this.state.lastName.trim();
        const data = {
            name: this.state.name,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            firstName: firstName,
            lastName: lastName,
            age:this.state.age,
            image:this.state.image
        };
      
        this.props.registerUser(data, this.props.history);
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }

    handleFileRead = async (event) => {
        const file = event.target.files[0];
        const base64 = await this.convertBase64(file);
        console.log(base64);
        this.setState({image: base64})
    }

    handleFileSelect = (event) =>{
        this.setState({image: event.target.value})
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    render() {
        const { errors } = this.state;
        return(
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2 className='text-info' style={{marginBottom: '40px'}}>Регестрация</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            placeholder="Логин"
                            className={classnames('form-control form-control-default', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={ this.handleInputChange }
                            value={ this.state.name }
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={classnames('form-control form-control-default', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            placeholder="Введите пароль еще раз"
                            className={classnames('form-control form-control-default', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <hr/>
                    <div className="form-group mb-3">
                        <input type="text"
                               className={classnames('form-control', {
                                   'is-invalid': errors.firstName
                               })}
                               name='firstName'
                               placeholder="Ваше имя"
                               onChange={this.handleInputChange}
                               value={this.state.firstName}/>
                        {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                    </div>
                    <div className="form-group mb-3">
                        <input type="text"
                               className={classnames('form-control', {
                                   'is-invalid': errors.lastName
                               })}
                               name='lastName'
                               placeholder="Ваша фамилия"
                               onChange={this.handleInputChange}
                               value={this.state.lastName}/>
                        {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                    </div>
                    <div className="form-group mb-3">
                        <input type="number"
                               className={classnames('form-control', {
                                   'is-invalid': errors.age
                               })}
                               name='age'
                               placeholder="Ваш возраст"
                               onChange={this.handleInputChange}
                               value={this.state.age}/>
                        {errors.age && (<div className="invalid-feedback">{errors.age}</div>)}
                    </div>
                        <div className="form-group mb-3">
                            <input
                                id="inputGroupFile04"
                                className={classnames('form-image-upload', {
                                    'is-invalid': errors.image
                                })}
                                type="file"
                                accept = 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' 
                                required
                                name="originalFileName"
                                onChange={this.handleFileRead}
                                size="small"
                                variant="standard"
                            />
                            {errors.image && (<div className="invalid-feedback">{errors.image}</div>)}
                        </div>

                    <div className="form-group mt-4">
                        <ButtonSubmit text='Зарегестрироваться'/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))