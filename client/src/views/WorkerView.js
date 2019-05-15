import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
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
        return(     <OrderCardContainerComponent 
                        orders={this.state.orders}
                        setEditingOrder={(orderId) => this.handleOrderSelection(orderId)} 
                        isFullViewRequired={false || this.state.orders.length == 0}
                        title={`All orders`}
                        currentView={VIEWS.WORKER_VIEW}/>
            )
    }
}

export default WorkerView;