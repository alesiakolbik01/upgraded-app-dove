import React from "react";
import PropTypes from 'proptypes';


export default class ItemList extends React.Component{
    static propTypes = {
        active:PropTypes.bool.isRequired,
        userName:PropTypes.string.isRequired,
        id:PropTypes.string.isRequired,
        click:PropTypes.func.isRequired
    };
    state = {
        active: false
    };

    componentWillMount(){
        this.setState({active:this.props.active,id:this.props.id});
    };
    handleClick = ()=>{
        this.props.click(this.props.id);
    };
    componentWillReceiveProps(newProps){
        this.setState({active:newProps.active});
    }
    render() {
        return (
            <div className={(this.state.active)?'active row p-3 item-hover text text-capitalize'
                : 'row p-3 item-hover'}
                 onClick={this.handleClick}>
                <span className='text-capitalize'>{this.props.userName.toLowerCase()}</span>
            </div>
        )
    }
};