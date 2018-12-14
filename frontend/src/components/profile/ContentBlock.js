import React from "react";
import PropTypes from 'proptypes';
import Profile from './user-profile/Profile.js';
import Chat from './chat/Chat.js';
import UsersGallery from './usersGallery/UsersGallery.js';
import UserLikes from './likes/UserLikes.js';


export default class ContentBlock extends React.PureComponent {

    static propTypes = {
        blockType:PropTypes.string.isRequired,
        socket:PropTypes.object.isRequired
    };
    render() {
        const blockType = this.props.blockType;
        let block;
        switch (blockType) {
            case
            'userProfile'
            :
                block = (<Profile/>);
                break;
            case
            'messages'
            :
                block = (<Chat socket={this.props.socket}/>);
                break;
            case
            'usersGallery'
            :
                block = (<UsersGallery/>);
                break;
            case
            'userLikes'
            :
                block = (<UserLikes/>);
                break;
            default:
                block = null;
        }
        return (
            block
        )
    }
}
