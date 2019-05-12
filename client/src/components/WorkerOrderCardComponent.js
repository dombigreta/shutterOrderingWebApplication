import React from 'react';
import { isNullOrUndefined } from 'util';
import AddPartsComponent from './AddPartsComponent';

import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';

class WorkerOrderCardComponent extends React.Component{

    state = {
        order: WorkerStore._editingOrder
    }

    componentDidMount(){
        let orderId = this.props.match.params.number;
        WorkerStore.addChangeListener(this.handleChange);
        WorkerActions.getOrderById(orderId);        
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({order:WorkerStore._editingOrder});
    }

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    backToOrders = () => {
       this.props.history.goBack();
       WorkerActions.setEditingOrderUndefined();
    }

    getStateOfOrder(){
        if(this.state.order.isDone){
            return 'Done';
        }
        else if (this.state.order.isInProgress){
            return 'Is in progress';
        }
        else{
            return 'Not yet being assembled';
        }
    }
    
    render(){
        if(isNullOrUndefined(this.state.order)) return <React.Fragment></React.Fragment>
        console.log(this.props);
        return (
            <React.Fragment>
                    <button onClick={this.backToOrders} className="btn btn-sm btn-info mb-3">back to orders</button>
            <div key={this.state.order._id}  className="col-12 card mb-2 fancy-font-size">
                <div className="card-body">
                   <div><label className="font-weight-bold">Date of ordering: </label> {this.formatDate(this.state.order.dateOfSubmittingOrder)}</div>
                   <div><label className="font-weight-bold">Has been paid: </label> {this.state.order.isPaid ? 'yes' : 'no'}</div>
                   <div><label className="font-weight-bold">State of order:</label> {this.getStateOfOrder()}</div>
                   <div><label className="font-weight-bold">Price:</label> {this.state.order.price} {this.state.order.currency}</div>
                   <div className="p-3 mb-2 bg-info text-white">
                      <h6 className="font-weight-bold">Window parameters:</h6>
                        <div className="d-flex">
                        <div className="m-1"><label className="font-weight-bold">Height </label> {this.state.order.window.height} cm</div>
                        <div className="m-1"><label className="font-weight-bold">Width: </label> {this.state.order.window.height} cm</div>
                        </div>
                   </div>
                 </div>
            </div>
            <AddPartsComponent order={this.state.order}/>
            </React.Fragment>
        )
    }
}

export default WorkerOrderCardComponent;