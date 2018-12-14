import React from 'react';
import UserProfileInfo from "../UserProfileInfo";
import PropTypes from "proptypes";

export default class CardProfile extends React.Component{
    static propTypes = {
        profile: PropTypes.shape({
            firstName:PropTypes.string.isRequired,
            lastName:PropTypes.string.isRequired,
            profession:PropTypes.string.isRequired,
            aboutSelf:PropTypes.string,
            search:PropTypes.string,
            age:PropTypes.number.isRequired,
        })
    };
    render(){
        return(
            <div className="profile card rounded m-1" style={{width:'1rem',display:'inline-block'}}>
                <div className="card-img-top card-item">
                    <img  src={this.props.profile.image} className='card-img-top' alt=""/>
                </div>
                    <div className="card-body card-item-text">
                        <UserProfileInfo profile = {this.props.profile}/>
                    </div>
            </div>
        )
    }
}