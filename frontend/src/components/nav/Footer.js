import React from 'react';

export const Footer = ()=>{
    return(
        <nav className="nav nav-pills nav-justified footer p-3">
            <span className="nav-item nav-link text-info justify-content-center align-items-center">Выпускной проект для ПВТ IT-Academy<br/>
                Курс: React</span>
            <span className="nav-item text-info justify-content-center align-items-center">
                <a className="text-info" href="https://www.linkedin.com/in/alesia-kolbik-64aa71172/">Автор: Alesia Kolbik</a><br/>
                <a className="text-info" href="https://github.com/AlesiaKolbik/Dove-app">Github</a>
            </span>
            <span className="nav-item text-info justify-content-center align-items-center">React + Redux JSX Webpack Bootstrap<br/>
                Node.js + Express Axios Mongoose
            </span>
        </nav>
    )

};