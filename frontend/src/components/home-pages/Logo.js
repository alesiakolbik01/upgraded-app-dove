import React from "react";
import PropTypes from 'prop-types';


export default class Logo extends React.Component{
    static propTypes = {
        url:PropTypes.string
    };
    render(){
        return(
            <img src={this.props.url} alt='logo-dove' className="logo-dove width-20"/>
        )
    }
}