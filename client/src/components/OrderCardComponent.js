import React from 'react';
import * as ORDER_STATES from '../stateoforderconstants';
import * as ViewActions from '../store/ViewStore/ViewActions';
import Card from 'react-bootstrap/Card';

class OrderCardComponent extends React.Component{

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    getStateOfOrder = (state) => {
        switch(state){
            case ORDER_STATES.SUBMITTED: return 'The order is submitted';
            break;
            case ORDER_STATES.ASSIGNED_TO_WORKER: return 'The order was assigned to a worker';
            break;
            case ORDER_STATES.STARTED_ASSEMBLING: return 'The order was started being assembled';
            break;
            case ORDER_STATES.DONE: return 'The order is finished';
            break;
            case ORDER_STATES.PAYED: return 'The order is paid';
            break;
            default: return 'N/A';
            break;
        }
    }

    navigateToOrder = (orderId) => {
        ViewActions.navigateToOrder({
            orderId:orderId
        })
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

    render(){
        let {order, index} = this.props;
        return(
            <Card key={order._id} onClick={() => this.navigateToOrder(order._id)} border="light" className={`${this.props.isFullViewRequired ? 'col-12': 'col-6'} fancy-font-size`}>
            <Card.Header>{this.props.isIndexingNeeded ? index + '#' : ''} Order</Card.Header>
            <Card.Body>
              <Card.Title>Order's details</Card.Title>
              <Card.Text>
                    <div><label className="font-weight-bold">Date of ordering: </label> {this.formatDate(order.dateOfSubmittingOrder)}</div>
                    <div><label className="font-weight-bold">State of order:</label> {this.getStateOfOrder(order.stateOfOrder)}</div>
                    <div><label className="font-weight-bold">Price:</label> {order.price} {order.currency}</div>
                   {order.windows.map((window,index) => this.createWindowParameterCell(window,index+1))}
                   {this.props.children}
              </Card.Text>
            </Card.Body>
          </Card>
        )
    }
}


export default OrderCardComponent;