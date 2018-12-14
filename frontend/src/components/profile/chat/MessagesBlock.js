import React from "react";
import PropTypes from 'proptypes';
import Message from "./Message";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";



class MessagesBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            client:this.props.socket
        };
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    static propTypes = {
        onSendMessage:PropTypes.func.isRequired,
        image:PropTypes.string,
        userName:PropTypes.string,
    };

    onInputMessage = (e) => {
        this.setState({input: e.target.value})
    };
    onSubmit(){
        if (!this.state.input)
            return;
        this.props.onSendMessage(this.state.input.trim());
        this.setState({input:''});
    };

    componentDidMount() {
        this.scrollChatToBottom();
    }

    componentDidUpdate() {
        this.scrollChatToBottom();
    }

    scrollChatToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="col border border-grey border-top-0 border-bottom-0">
                {this.props.activeTab?
                <div className="row bbb height-60px text-capitalize border-bottom border-grey justify-content-end align-items-center text-info">
                    {this.props.userName.toLowerCase()}
                <img className='rounded avatar ml-2 mr-3' src={this.props.image} alt=''/>
                </div> :
                    <div className="row bbb height-60px border-bottom border-grey justify-content-end align-items-center text-info"></div>
                }
                <div className='chat row'>
                    <div className='col panel'>
                    {(this.props.chatHistory.length !== 0 && this.props.activeTab) &&
                    (this.props.chatHistory.map(message => {
                        return (<Message key={message._id}
                                         text={message.body}
                                         user={message.author._id || message.author}
                                         time={message.createdAt} id = {this.props.id}/>)
                    }))
                    }
                        {(!this.props.activeTab) && <div className='text-info text-center mt-5'>
                            <h4>Выберите пользователя для разговора</h4></div>}
                        <div style={{ float:"left", clear: "both" }}
                             ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className='col'>
                        {(this.props.messageSendError) && <div className='text-danger border-danger'>
                            {this.props.messageSendError}</div>}
                        <div className="input-group mb-3">
                            <input type="text" className="form-control rounded" placeholder="Введите сообщение..."
                                   aria-label="Recipient's username" aria-describedby="button-addon2"
                                   value={this.state.input}
                                   onChange={this.onInputMessage}
                                   onKeyPress={e => (e.key === 'Enter' ? this.onSubmit() : null)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    socket:state.socket,
    messageSendError:state.messages.error
});


export default connect(mapStateToProps)(withRouter(MessagesBlock));