import  * as VIEW_STORE_ACTIONS from './ViewConstants';
import ViewStore from './ViewStore';
import * as VIEWS from '../../views/ViewConstants';

import ViewDispatcher from './ViewDispatcher';


export function handleViewChange(payload){
    ViewDispatcher.handleAction({
        type:payload.view
    })
}

export function navigateToOrder(payload){
    ViewDispatcher.handleAction({
        type:VIEW_STORE_ACTIONS.SHOW_ORDER,
        orderId:payload.orderId
    })
}

export function navigateBack(){
   switch(ViewStore._currentView){
       case VIEWS.MANAGER_VIEW:{
           ViewDispatcher.handleAction({
               type:VIEW_STORE_ACTIONS.SHOW_MANAGER_VIEW
           });
       }
       break;
       case VIEWS.WORKER_VIEW:{
               ViewDispatcher.handleAction({
                   type:VIEW_STORE_ACTIONS.SHOW_WORKER_VIEW
               })
           }
           break;
       }
}