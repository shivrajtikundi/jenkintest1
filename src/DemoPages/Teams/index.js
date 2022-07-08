import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import style from './style.module.css';
import MyTeam from './Components/my_team.js';
const AppSource = ({match}) => {
    return(
        <Fragment>
            <AppHeader menuclosable={false}/>
            <div className="app-main">
                <AppSidebar innermenu={true}/>
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <MyTeam />
                    </div>
                </div>
            </div>

        </Fragment>
    );

};

export default AppSource;