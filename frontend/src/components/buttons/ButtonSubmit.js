import React from 'react';


const ButtonSubmit = ({text})=>{
    return(
        <button type="submit" className="btn btn-info">
            {text}
        </button>
    )
};

export {ButtonSubmit};