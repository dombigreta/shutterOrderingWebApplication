import React from 'react';
import { isNullOrUndefined } from 'util';

class OrderCardComponent extends React.Component{

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    backToOrders = () => {
       this.props.history.goBack();
    }
    
    render(){
        if(isNullOrUndefined(this.props.order)) return <React.Fragment></React.Fragment>
        const { order } = this.props;
        return (
            <React.Fragment>
                <button onClick={this.backToOrders} className="btn btn-sm btn-info mb-3">back to orders</button>
            <div key={order._id}  className="col-12 card mb-2 fancy-font-size">
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
            {this.props.children}
            </React.Fragment>
        )
    }
}

export default OrderCardComponent;