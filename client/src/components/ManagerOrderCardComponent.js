import React from 'react';
import { isNullOrUndefined } from 'util';
import OrganiseInstallationComponent from './OrganiseInstallationComponent';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import ManagerStore from '../store/ManagerStore/ManagerStore';


class ManagerOrderCardComponent extends React.Component{

    state = {
        order: ManagerStore._editingOrder,
        workers: ManagerStore._workers,
        selectedWorker:null
    }

    componentDidMount(){
        let orderId = this.props.match.params.number;
        ManagerStore.addChangeListener(this.handleChange);
        ManagerActions.getOrderById(orderId);
        ManagerActions.getWorkersDataForInstallation();      
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({order:ManagerStore._editingOrder, workers:ManagerStore._workers}, () => {
                if(!isNullOrUndefined(this.state.order) && (!isNullOrUndefined(this.state.workers) || this.state.workers.length > 0)){
                    let worker = this.state.workers.filter(worker => worker._id === this.state.order.workerId)[0];
                    this.setState({selectedWorker:worker});
                }
        
            });
    }

    formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', options);
    }

    backToOrders = () => {
       this.props.history.goBack();
       ManagerActions.setEditingOrderUndefined();
    }


    getStateOfOrder = () => {
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
                        <div className="m-1"><label className="font-weight-bold">Height: </label> {this.state.order.window.height} cm</div>
                        <div className="m-1"><label className="font-weight-bold">Width: </label> {this.state.order.window.height} cm</div>
                        </div>
                   </div>
                   {!isNullOrUndefined(this.state.selectedWorker) && <div className="p-3 mb-2 bg-info text-white">
                      <h6 className="font-weight-bold">Worker info</h6>

                        <div><label className="font-weight-bold">Name: </label> {this.state.selectedWorker.lastName} {this.state.selectedWorker.firstName} </div>
                        <div><label className="font-weight-bold">Email: </label> {this.state.selectedWorker.email}</div>
                        <div className="d-flex">
                            <div className="m-1"><label className="font-weight-bold">City: </label> {this.state.selectedWorker.city}</div>
                            <div className="m-1"><label className="font-weight-bold">Address: </label> {this.state.selectedWorker.address}</div>
                    </div>
                   </div>}
                 </div>
            </div>
            <OrganiseInstallationComponent customerId={this.state.order.customerId}/>
            </React.Fragment>
        )
    }
}

export default ManagerOrderCardComponent;