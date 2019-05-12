import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
import {Switch, Route} from 'react-router-dom';
import * as VIEWS from './ViewConstants';

import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import WorkerOrderCardComponent from '../components/WorkerOrderCardComponent';
import { isNullOrUndefined } from 'util';


class WorkerView extends React.Component{
    state = {
        orders:WorkerStore._orders,
        parts:WorkerStore._parts,
        editingOrder:null,
        addtionalPrice:0
    }
    
    componentDidMount(){
        WorkerStore.addChangeListener(this.onChange);
        WorkerActions.getAllOrders();
        WorkerActions.getAllParts();
       
    }
    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.onChange);
    }

    
    onChange = () => {
        this.setState({orders:WorkerStore._orders, parts:WorkerStore._parts});
    }

    handleOrderSelection = (orderId) => {
        let order = this.state.orders.filter(order => order._id === orderId)[0];
        this.setState({editingOrder:order});
    }

  
    handleFinishingOrder = () => {
        if(isNullOrUndefined(this.state.editingOrder)){
            return;
        }
        let orderId = this.state.editingOrder._id;
        WorkerActions.finishOrder(orderId);
    }

    handleAssemblingOrder = () => {
        if(isNullOrUndefined(this.state.editingOrder)){
            return;
        }
        let orderId = this.state.editingOrder._id;
        WorkerActions.startAssemblingOrder(orderId);
    }

    render(){
        return(
            <Switch>
                 <Route exact path='/worker' render={(props) =>(
                    <OrderCardContainerComponent 
                        orders={this.state.orders}
                        setEditingOrder={(orderId) => this.handleOrderSelection(orderId)} 
                        isFullViewRequired={true}
                        title={`All orders`}
                        currentView={VIEWS.WORKER_VIEW}
                        {...props} />

                 )}/>
                 <Route path='/worker/order/:number' render={(props) => (
                  <WorkerOrderCardComponent  {...props}/>  
                 )}/>
            </Switch>)
    }
}

export default WorkerView;