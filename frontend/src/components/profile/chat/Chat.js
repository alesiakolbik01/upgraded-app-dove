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
        socket: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
        };
    }
    nextMsgId = null;

    componentDidMount() {
        const socket = this.props.socket;
        socket.on('new bc message', function (msg) {
            if(msg.conversationId !== this.props.currentChatId)return;
            if(this.nextMsgId === msg._id)return;
            this.props.receiveRawMessage(msg);
            this.nextMsgId = msg._id;
        }.bind(this));
        if(this.props.currentChatId){
            socket.emit('join room', this.props.currentChatId);
        }

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
            if(this.props.message && nextProps.message._id === this.props.message._id)return;
            const socket = this.props.socket;
            socket.emit('chat message', nextProps.message);
            this.props.addMessage(nextProps.message);

        }
        if(nextProps.currentChatId !== this.props.currentChatId){
            this.props.getChatHistory(nextProps.currentChatId);
            const socket = this.props.socket;
            socket.emit('join room', nextProps.currentChatId);
            socket.emit('leave room',this.props.currentChatId);
        }
    }
    componentWillUnmount() {
        const socket = this.props.socket;
        socket.emit('leave room',this.props.currentChatId);
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
                { this.props.profiles.length > 0 ? 
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
                        <MessagesBlock chatId={this.props.currentChatId}
                                    userName={profile.firstName}
                                    id={profile.user}
                                    image={profile.image}
                                    gender={profile.gender}
                                    activeTab={this.state.activeTab}
                                    onSendMessage={this.handleSendMessage}
                                    chatHistory={this.props.chatHistory}
                                    chatHistoryId ={this.props.chatHistoryId}
                        />
                    </div> : <div className="row height-600">
                                <h5 className='text-center text-secondary text-uppercase mt-5 ml-5'>Здесь пока ничего нет</h5>
                            </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profiles: state.blockUserInfo.matches,
    chatHistory: state.messages.data,
    chatHistoryId: state.messages.id,
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