import React from 'react';
import {closeModal} from "../../../actions/setLikeOnProfile";
import {getUsersList} from '../../../actions/switchInfoBlock';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

const imgHeart = require('../../../image/heart_PNG51318.png');


class Modal extends React.Component {
    handleClose = ()=>{
        this.props.closeModal();
    };
    handleOpenChat = ()=>{
        this.props.closeModal();
        this.props.getUsersList();
    };
    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title text-center"><img src={imgHeart} alt=''/></p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={this.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h4 className='text-center'>Это взаимно!</h4>
                            <p className='text-center'>Вам нравиться {this.props.name}.И
                            Вы {this.props.gender === 'Женский' ? 'ей' : 'ему'} нравитесь.<br/>
                            Теперь Вы можете перейти в чат и пообщаться!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-primary pl-5 pr-5 m-auto"
                                    data-dismiss="modal"
                            onClick={this.handleOpenChat}> Сказать &laquo;привет&raquo;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps,{closeModal, getUsersList})(withRouter(Modal));