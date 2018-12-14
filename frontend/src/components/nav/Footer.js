import React from 'react';

export const Footer = ()=>{
    return(
        <nav className="nav nav-pills nav-justified footer m-1">
            <span className="nav-item nav-link text-info text-left">Выпускной проект для ПВТ IT-Academy<br/>
                Курс: React и Angular</span>
            <span className="nav-item text-info text-left">
                <a className="text-info" href="https://www.linkedin.com/in/alesia-kolbik-64aa71172/">Автор: Alesia Kolbik</a><br/>
                <a className="text-info" href="https://github.com/AlesiaKolbik/Dove-app">
                    <img src="https://img.icons8.com/color/50/000000/github.png" alt=''/> Github
                </a>

            </span>
            <span className="nav-item text-info text-left">React + Redux JSX Webpack Bootstrap<br/>
                Node.js + Express Axios Mongoose
                 <a className='text-black-50' href="https://icons8.com"> Icon pack by Icons8</a>
            </span>
        </nav>
    )

};