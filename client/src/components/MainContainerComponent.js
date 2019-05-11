import React from 'react';

import {Switch, Route} from 'react-router-dom';

import CustomerView from '../views/CustomerView';
import WorkerView from '../views/WorkerView';
import ManagerView from '../views/ManagerView';

class MainContainerComponent extends React.Component{

    render(){
        return(
            <div className="container">
            <div className="row">
            <div className="col-8 mx-auto mt-2">
                <Switch>
                    <Route exact path="/customer" component={CustomerView}></Route>
                    <Route path="/worker" component={WorkerView}></Route>
                    <Route path="/manager" component={ManagerView}></Route>
                </Switch>
                </div>
                </div>
                </div>
        )
    }
}

export default MainContainerComponent;