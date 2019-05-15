import {Dispatcher}  from 'flux';
import  * as VIEW_STORE_ACTIONS from './ViewConstants';
import * as VIEWS from '../../views/ViewConstants';
import ViewStore from './ViewStore';
import ReactDOM from 'react-dom';
import React from 'react';

import CustomerView from '../../views/CustomerView';
import ManagerView from '../../views/ManagerView';
import WorkerView from '../../views/WorkerView';

import WorkerOrderCardComponent from '../../components/WorkerOrderCardComponent';
import ManagerOrderCardComponent from '../../components/ManagerOrderCardComponent';
import { isNullOrUndefined } from 'util';



class ViewDispatcher extends Dispatcher{
    handleAction(action){
        this.dispatch({
            action:action
        })
    }
}

const dispatcher = new ViewDispatcher();

dispatcher.register((data) => {
    if(data.action.type !== VIEW_STORE_ACTIONS.SHOW_CUSTOMER_VIEW){
        return;
    }
    ReactDOM.render(
        React.createElement(CustomerView),
        document.getElementById('container')
    )
    ViewStore._currentView = VIEWS.CUSTOMER_VIEW;

});

dispatcher.register((data) => {
    if(data.action.type !== VIEW_STORE_ACTIONS.SHOW_MANAGER_VIEW){
        return;
    }

    ReactDOM.render(
        React.createElement(ManagerView),
        document.getElementById('container')
    )

    ViewStore._currentView = VIEWS.MANAGER_VIEW;
});

dispatcher.register((data) => {
    if(data.action.type !== VIEW_STORE_ACTIONS.SHOW_WORKER_VIEW){
        return;
    }
    ReactDOM.render(
        React.createElement(WorkerView),
        document.getElementById('container')
    )

    ViewStore._currentView = VIEWS.WORKER_VIEW;
    
});

dispatcher.register((data) => {
    if(data.action.type !== VIEW_STORE_ACTIONS.SHOW_ORDER || isNullOrUndefined(data.action.orderId)){
        return;
    }

    let props = {orderId:data.action.orderId};

    switch(ViewStore._currentView){
        case VIEWS.WORKER_VIEW:{
            ReactDOM.render(
                React.createElement(WorkerOrderCardComponent,props),
                document.getElementById('container')
            )
        }
        break;
        case VIEWS.MANAGER_VIEW:{
            ReactDOM.render(
                React.createElement(ManagerOrderCardComponent,props),
                document.getElementById('container')
            )
        }
        break;
        default: return;
    }
});

dispatcher.register((data) => {
    if(data.action.type !== VIEW_STORE_ACTIONS.BACK_TO){
        return;
    }
    switch(ViewStore._currentView){
        case VIEWS.WORKER_VIEW:{
            dispatcher.handleAction({type:VIEW_STORE_ACTIONS.SHOW_WORKER_VIEW});
        }
        break;
        case VIEWS.MANAGER_VIEW:{
            dispatcher.handleAction({type:VIEW_STORE_ACTIONS.SHOW_MANAGER_VIEW})
        }
        break;
    }
});

export default dispatcher;