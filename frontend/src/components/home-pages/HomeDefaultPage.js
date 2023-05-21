import React from 'react';

const logo = require('../../image/dove.jpg');

export const HomeDefaultPage = () =>{
        return (
            <div className={'container-fluid'}>
                <div className="row h-10">
                    <div className="col d-flex align-items-center">
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-12">
                        <h1 className={'header-main-page text-info text-center font-weight-light'}>
                            Знакомьтесь.<br/>Общайтесь. Встречайтесь.</h1>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-sm-3">
                    </div>
                    <div className="col-12 h-40">
                        <img src={logo} alt='' className='logo-big'/>
                    </div>
                </div>
            </div>
        );
};
