import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Profile from "./Components/profile";
import Login from "./Components/login";
import ForgotPassword from "./Components/forgot_pass";
import ResetPassword from "./Components/reset_pass";

import Signup from "./Components/signup";
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Users = ({match}) => {
    return(
        <Fragment>
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={`${match.url}/signup`} component={Signup} />
            <Route path={`${match.url}/forgot_pass`} component={ForgotPassword} />
            <Route path={`${match.url}/reset_pass/:email`} component={ResetPassword} />
                
            <Route path={`${match.url}/profile`} >
                <AppHeader menuclosable={false}/>
                    <div className="app-main">
                        <AppSidebar innermenu={true}/>
                        <div className="app-main__outer">
                            <div className="app-main__inner">
                                <Profile />
                            </div>
                        </div>
                    </div>
            </Route>
                    
        </Fragment>
    );

};

export default Users;