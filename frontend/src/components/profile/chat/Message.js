import React from "react";
import PropTypes from 'proptypes';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import moment from 'moment';

class Message extends React.PureComponent {
    static propTypes = {
        profile: PropTypes.shape({
                firstName:PropTypes.string.isRequired,
                lastName:PropTypes.string.isRequired,
                gender:PropTypes.string.isRequired,
                profession:PropTypes.string.isRequired,
                aboutSelf:PropTypes.string,
                search:PropTypes.string,
                age:PropTypes.number.isRequired,
                image:PropTypes.string.isRequired
            }),
        time:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired
    };
    render() {
        const time = moment(this.props.time).calendar();
        return (
            <div className={(this.props.user === this.props.profile.user._id)?
                "row m-1 justify-content-end text-success":"row m-1 text-info"}>
                <div className="card rounded ml-5 mr-5">
                    <div className="card-body">
                        <span className='text-black-50 font-weight-light font-italic message-time'> {time}</span>
                        <p className="card-text">{this.props.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    profile:state.blockUserInfo.profile
});


export default connect(mapStateToProps)(withRouter(Message));
