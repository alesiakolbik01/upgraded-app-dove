import React from "react";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import CardProfile from "./Card-profile";
import PropTypes from "proptypes";
import {openChat} from "../../../actions/chat";

class UserLikes extends React.PureComponent {
    static propTypes = {
        profiles: PropTypes.arrayOf(
            PropTypes.shape({
                firstName:PropTypes.string.isRequired,
                lastName:PropTypes.string.isRequired,
                gender:PropTypes.string.isRequired,
                profession:PropTypes.string.isRequired,
                aboutSelf:PropTypes.string,
                search:PropTypes.string,
                age:PropTypes.number.isRequired,
                image:PropTypes.string.isRequired
            })
        )
    };
    render(){
        return(
            <div style={{position: 'relative'}} className='col-9 mb-2 height-600'>
                <div className='row'>
            {
                this.props.profiles.map(item =>{
                     let profile = {firstName:item.firstName, lastName:item.lastName,
                         age:item.age,profession:item.profession,search:item.search,image:item.image, conversation:item.conversation};
                return <CardProfile key={item._id} profile={profile}/>   //clickProfile={this.handleClickProfile}
            })}
                {(this.props.profiles.length === 0) && <h5 className='text-center text-secondary text-uppercase mt-5 ml-5'>Здесь пока ничего нет</h5>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profiles:state.blockUserInfo.profiles
});

export default connect(mapStateToProps,{openChat})(withRouter(UserLikes));