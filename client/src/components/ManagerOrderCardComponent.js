import React from 'react';
import { isNullOrUndefined } from 'util';
import OrganiseInstallationComponent from './OrganiseInstallationComponent';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import ManagerStore from '../store/ManagerStore/ManagerStore';


class ManagerOrderCardComponent extends React.Component{

    state = {
        order: ManagerStore._editingOrder
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.handleChange);
        ManagerActions.getOrderById('5cd40ceec265336c42b11771');        
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({order:ManagerStore._editingOrder});
    }

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    backToOrders = () => {
       this.props.history.goBack();
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

        return (
            <React.Fragment>
                    <button onClick={this.backToOrders} className="btn btn-sm btn-info mb-3">back to orders</button>
            <div key={this.state.order._id}  className="col-12 card mb-2 fancy-font-size">
                <div className="card-body">
                   <div><label className="font-weight-bold">Date of ordering: </label> {this.formatDate(this.state.order.dateOfSubmittingOrder)}</div>
                   <div><label className="font-weight-bold">Has been paid: </label> {this.state.order.isPaid ? 'yes' : 'no'}</div>
                   <div><label className="font-weight-bold">State of order:</label>{this.getStateOfOrder()}</div>
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
            <OrganiseInstallationComponent/>
            </React.Fragment>
        )
    }
}

export default ManagerOrderCardComponent;