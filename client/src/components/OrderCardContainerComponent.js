import React from 'react';
import * as VIEWS from '../views/ViewConstants'


class OrderCardContainerComponent extends React.Component{

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    getStateOfOrder = (order) => {
        if(order.isDone){
            return 'Done';
        }
        else if (order.isInProgress){
            return 'Is in progress';
        }
        else{
            return 'Not yet being assembled';
        }
    }
    

    createOrderCell = (order) => {
        return (
            <div key={order._id} onClick={() => this.navigateToOrder(order._id)} className={`${this.props.isFullViewRequired ? 'col-12' : 'col-6'} card mb-2 fancy-font-size`}>
                <div className="card-body">
                   <div><label className="font-weight-bold">Date of ordering: </label> {this.formatDate(order.dateOfSubmittingOrder)}</div>
                   <div><label className="font-weight-bold">Has been paid: </label> {order.isPaid ? 'yes' : 'no'}</div>
                   <div><label className="font-weight-bold">State of order:</label> {this.getStateOfOrder(order)}</div>
                   <div><label className="font-weight-bold">Price:</label> {order.price} {order.currency}</div>
                   {order.windows.map((window,index) => this.createWindowParameterCell(window,index+1))}
                 </div>
            </div>
        )
    }

    createWindowParameterCell = (window,index) => {
        return (
            <div key={index} className="p-3 mb-2 bg-info text-white">
                      <h6 className="font-weight-bold">{`${index}. Window parameters:`}</h6>
                        <div className="d-flex">
                        <div className="m-1"><label className="font-weight-bold">height </label> {window.height} cm</div>
                        <div className="m-1"><label className="font-weight-bold">width: </label> {window.height} cm</div>
                        </div>
                </div>
        )
    }

    navigateToOrder = (orderId) => {
        if(this.props.currentView === VIEWS.CUSTOMER_VIEW) return;
        let baseUrl = this.props.currentView;
        this.props.history.push(`${baseUrl}/order/${orderId}`);
    } 

    render(){

        if(this.props.orders === undefined || this.props.orders.length === 0){
            return (
                <React.Fragment>
                No orders to show
                </React.Fragment>
            )
        } 


        return(
            <React.Fragment>
                <h4>{this.props.title}</h4>
                    <div className={`${this.props.isFullViewRequired ? 'worker-container-style' : 'customer-container-style'}`}>
                        {this.props.orders.map(order => this.createOrderCell(order))}
                    </div>
            </React.Fragment>
        )
    }

}

export default OrderCardContainerComponent;