import React from 'react';

export const Loading = () => {
    return (
        <div className={'container'}>
            <h2 className='text-center text-info'>loading...</h2>
            <div id="cssload-pgloading">
                <div className="cssload-loadingwrap">
                    <ul className="cssload-bokeh">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}