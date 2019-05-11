import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
import {Switch, Route} from 'react-router-dom';
import * as VIEWS from './ViewConstants';

import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import OrderCardComponent from '../components/OrderCardComponent';
import AddPartsComponent from '../components/AddPartsComponent';


class WorkerView extends React.Component{
    state = {
        orders:WorkerStore._orders,
        parts:WorkerStore._parts,
        editingOrder:null
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
                 <Route path='/worker/:number' render={(props) => (
                     <OrderCardComponent order={this.state.editingOrder} {...props} >
                     <AddPartsComponent/>
                     </OrderCardComponent>
                 )}/>
            </Switch>)
    }
}

export default WorkerView;