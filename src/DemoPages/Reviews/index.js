import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import Reviews from './Components/reviews';

const AppReviews = ({match}) => {
    return(
        <Fragment>
            <Route exact path={`${match.url}`} >
                <AppHeader menuclosable={false}/>
                    <div className="app-main">
                        <AppSidebar innermenu={true}/>
                        <div className="app-main__outer">
                            <div className="app-main__inner">
                                <Reviews />
                            </div>
                        </div>
                    </div>
            </Route>
                    
        </Fragment>
    );

};

export default AppReviews;