import React from 'react';
import { isNullOrUndefined } from 'util';
import AddPartsComponent from './AddPartsComponent';

import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
import OrderCardComponent from './OrderCardComponent';

import { NoOrdersToShowComponent } from './MessageComponents';

class WorkerOrderCardComponent extends React.Component{

    state = {
        order: WorkerStore._editingOrder
    }

    componentDidMount(){
        WorkerStore.addChangeListener(this.handleChange);
        WorkerActions.getOrderById(this.props.orderId);        
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({order:WorkerStore._editingOrder});
    }

    backToOrders = () => {
       
       WorkerActions.setEditingOrderUndefined();
    }

    render(){
        if(isNullOrUndefined(this.state.order)) return <NoOrdersToShowComponent/>
        return (
            <React.Fragment>
                    <button onClick={this.backToOrders} className="btn btn-sm btn-info mb-3">back to orders</button>
                    <OrderCardComponent order={this.state.order} 
                                    isIndexingNeeded={false} 
                                    isFullViewRequired={true}/>
            <AddPartsComponent order={this.state.order}/>
            </React.Fragment>
        )
    }
}

export default WorkerOrderCardComponent;