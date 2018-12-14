import React from "react";
import UserProfileInfo from "../UserProfileInfo";
import PropTypes from 'proptypes';
import {setLike, saveMatches,showModal} from '../../../actions/setLikeOnProfile';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";


class ProfileInGallery extends React.PureComponent {
    static propTypes = {
        setLike: PropTypes.func.isRequired,
        profile: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            gender: PropTypes.string.isRequired,
            profession: PropTypes.string.isRequired,
            aboutSelf: PropTypes.string,
            search: PropTypes.string,
            age: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        }),

    };
    state = {
        hidden: false,
        like:false
    };
    handleBtnClose = () => {
        this.setState({hidden: true})
    };
    handleBtnLike = () => {
        this.props.setLike(this.props.profile._id);
        this.setState({ like:true});
        const match = this.checkMatches(this.props.currentUserProfile.likes, this.props.profile._id);
        if(match){
            this.props.saveMatches(match);
            this.props.showModal(this.props.profile.firstName, this.props.profile.gender)
        }
        setTimeout(()=>this.setState({hidden: true}), 1000)
    };

    checkMatches = (likes, userId)=>{
        for(let i = 0;i < likes.length;i++){
            if(likes[i] === userId)
                return likes[i];
        }
        return ''
    };

    componentWillReceiveProps() {
        this.setState({hidden: false});
    }

    render() {
        return (
            <div hidden={this.state.hidden}
                 style={{position: 'absolute', zIndex: 1, width: '90%', height: '100%'}}
                 className="row m-3 bg-white rounded box-shadow text-truncate">
                <div className="cont-photo-gallery p-0 col-sm-6" style={{position: 'relative'}}>
                    <div className='buttons-group'>
                        <span onClick={this.handleBtnClose} className='btn-close'>
                            <img src="https://img.icons8.com/ultraviolet/40/000000/cancel-2.png" alt=""/>
                        </span>
                        <span onClick={this.handleBtnLike} >
                            <div className={(this.state.like) ? 'heart is_animating' : 'heart'}></div>
                        </span>
                    </div>
                    <img src={this.props.profile.image} className="img-fluid" style={{width: '100%'}} alt=""/>
                </div>
                <UserProfileInfo profile={this.props.profile}/>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    currentUserProfile: state.blockUserInfo.profile
});

export default connect(mapStateToProps, {setLike, saveMatches,showModal})(withRouter(ProfileInGallery));