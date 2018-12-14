import React from "react";
import PropTypes from 'proptypes';
import ItemList from "./ItemList";
import MessagesBlock from "./MessagesBlock";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {
    addMessage,
    createNewChat,
    getChatHistory,
    openChat,
    receiveRawMessage,
    sendMessage,
    clearMessage
} from "../../../actions/chat";


class Chat extends React.PureComponent {
    static propTypes = {
        profiles: PropTypes.array.isRequired,
        socket: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
        };
    }

    componentDidMount() {
        const socket = this.props.socket;
        socket.on('new bc message', function (msg) {
            this.props.receiveRawMessage(msg);
        }.bind(this));
    }

    handleClickTab = (id) => {
        const user = this.props.profiles.find(profile =>
            profile.user === id);
        if (!user.conversation) {
            this.props.createNewChat(id);
        } else {
            this.props.getChatHistory(user.conversation);
            this.props.openChat(user.conversation);
        }
        this.setState({activeTab: id});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.message) {
            const socket = this.props.socket;
            socket.emit('chat message', nextProps.message);
            this.props.clearMessage();
            this.props.addMessage(nextProps.message);
        }
        if (nextProps.messageSendError) {
            alert('Сообщение не было доставлено.Ошибка: ' + this.props.messageSendError)
        }
        if(nextProps.currentChatId !== this.props.currentChatId){
            const socket = this.props.socket;
            socket.emit('join room', nextProps.currentChatId);
            console.log('user join room' + nextProps.currentChatId)
        }
    }

    handleSendMessage = (msg) => {
        if (!this.props.currentChatId) return;
        this.props.sendMessage(this.props.currentChatId, msg);
    };

    render() {
        const userArr = this.props.profiles.filter(profile => {
            return (profile.user === this.state.activeTab)
        });
        let profile = userArr[0];
        if (!profile) {
            profile = {};
        }
        return (
            <div className='col border-left border-grey'>
                <div className='row border-bottom border-grey'>
                    <div className="col-3">
                        <div
                            className="row p-3 border-bottom border-grey text-info height-60px align-items-center">Пользователи
                        </div>
                        <div className='row users'>
                            <div className='col'>
                                {this.props.profiles.map(profile => {
                                    return (<ItemList key={profile.user}
                                                      userName={profile.firstName}
                                                      active={(profile.user === this.state.activeTab)}
                                                      id={profile.user}
                                                      click={this.handleClickTab}/>)
                                })}
                            </div>
                        </div>
                    </div>
                    <MessagesBlock chatId={this.state.chatId}
                                   userName={profile.firstName}
                                   id={profile.user}
                                   image={profile.image}
                                   gender={profile.gender}
                                   activeTab={this.state.activeTab}
                                   onSendMessage={this.handleSendMessage}
                                   chatHistory={this.props.chatHistory}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profiles: state.blockUserInfo.matches,
    chatHistory: state.messages.data,
    user: state.blockUserInfo.profile.user._id,
    currentChatId: state.blockUserInfo.activeChat,
    message:state.messages.message

});

export default connect(mapStateToProps, {
    createNewChat,
    addMessage,
    receiveRawMessage,
    getChatHistory,
    openChat,
    sendMessage,
    clearMessage
})(withRouter(Chat));