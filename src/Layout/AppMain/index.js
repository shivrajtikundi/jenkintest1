import { Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment, useEffect, useState} from 'react';
import Loader from 'react-loaders'

import {
    ToastContainer,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Users from "../../DemoPages/Users";
import Login from "../../DemoPages/Users/Components/login";
import Dashboards from "../../DemoPages/Dashboards";
import Licence from "../../DemoPages/Licence";
import AppSource from "../../DemoPages/AppSource";
import Teams from "../../DemoPages/Teams";

import { userService, alertService } from '../../services';
import AppReviews from '../../DemoPages/Reviews/index';
import PrivateRoute from  "./PrivateRoute.js";

// const UserPages = lazy(() => import('../../DemoPages/UserPages'));
// const Applications = lazy(() => import('../../DemoPages/Applications'));
// const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));

// const Widgets = lazy(() => import('../../DemoPages/Widgets'));
// const Elements = lazy(() => import('../../DemoPages/Elements'));
// const Components = lazy(() => import('../../DemoPages/Components'));
// const Charts = lazy(() => import('../../DemoPages/Charts'));
// const Forms = lazy(() => import('../../DemoPages/Forms'));
// const Tables = lazy(() => import('../../DemoPages/Tables'));


const AppMain = () => {
    const [{
        user_logged_in,
        user
    }, setState] = useState({
        user_logged_in:"LOGGED_IN",
        user:null
    });
    useEffect(()=>{
        // if(window.location.href.indexOf("/user/login") == -1 && window.location.href.indexOf("/user/signup") == -1 && window.location.href.indexOf("/user/forgot_pass") == -1 && window.location.href.indexOf("/user/reet_pass") == -1){
            validateUser();  
        // }
        return()=>{
            // validateUser();
        }
    },[])
    const validateUser = () => {
        userService.findTokenUser().then((response) =>{
            setState((prevState) => ({
                ...prevState,
                user: response
            }))
        }).catch(error => {
            setState((prevState) => ({
                ...prevState,
                user: "ERROR"
            }))
            return;
        });
    }
    if(user==null){
        return  (<div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="line-scale-pulse-out"/>
                        </div>
                    </div>
                </div>);
    }

    return(
        <Fragment>
            <Route path="/dashboards" component={Dashboards}/>
            <Route path="/users" component={Users}/>
            <Route path="/licence" component={Licence}/>
            <Route path="/source" component={AppSource}/>
            <Route path="/teams" component={Teams}/>
            <Route path="/reviews" component={AppReviews}/>
            {(user!=null && user.success==true && user.data && user.data.length>0 && user.data[0]._id!="")?
                <Route exact path="/" render={() => (
                    <Redirect to="/dashboards"/>
                )}/>:
                <Route exact path="/" render={() => (
                    <Redirect to="/users/login"/>
                )}/>
            }
            
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </Fragment>
    )

};

export default AppMain;