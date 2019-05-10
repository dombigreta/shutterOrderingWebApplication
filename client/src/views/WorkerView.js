import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';

class WorkerView extends React.Component{
    state = {
        orders:WorkerStore._orders
    }
    
    componentDidMount(){
        WorkerStore.addChangeListener(this.onChange);
        WorkerActions.getAllOrders();
       
    }
    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.onChange);
    }

    
    onChange = () => {
        this.setState({orders:WorkerStore._orders});
    }

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }
    createOrderCell = (order) => {
        return (
            <div key={order._id} className="card mb-2 col-12 fancy-font-size">
                <div className="card-body">
                   <div><label className="font-weight-bold">Date of ordering: </label> {this.formatDate(order.dateOfSubmittingOrder)}</div>
                   <div><label className="font-weight-bold">Has been paid: </label> {order.isPaid ? 'yes' : 'no'}</div>
                   <div><label className="font-weight-bold">State of order:</label> {order.isInProgress ? 'In progress' : (order.isDone ? 'Done': 'Not yet assembled')}</div>
                   <div><label className="font-weight-bold">Price:</label> {order.price} {order.currency}</div>
                   <div className="p-3 mb-2 bg-info text-white">
                      <h6 className="font-weight-bold">Window parameters:</h6>
                        <div className="d-flex">
                        <div className="m-1"><label className="font-weight-bold">Height </label> {order.window.height} cm</div>
                        <div className="m-1"><label className="font-weight-bold">Width: </label> {order.window.height} cm</div>
                        </div>
                   </div>
                 </div>
            </div>
        )
    }

    render(){
        return(
            <React.Fragment>
                <div>
                <h4>All orders</h4>
                    <div className="d-flex flex-column">
                    {
                        this.state.orders.map((order) => {
                                return this.createOrderCell(order)
                        })
                    }
                    </div>          
            </div>
            </React.Fragment>)
    }
}

export default WorkerView;