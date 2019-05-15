import React from 'react';
import { isNullOrUndefined } from 'util';
import OrganiseInstallationComponent from './OrganiseInstallationComponent';
import * as ManagerActions from '../store/ManagerStore/ManagerActions';
import * as ViewActions from '../store/ViewStore/ViewActions';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import OrderCardComponent from '../components/OrderCardComponent';


class ManagerOrderCardComponent extends React.Component{

    state = {
        order: ManagerStore._editingOrder,
        workers: ManagerStore._workers,
        selectedWorker:null
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.handleChange);
        ManagerActions.getOrderById(this.props.orderId);
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

    backToOrders = () => {
       ViewActions.navigateBack();
       ManagerActions.setEditingOrderUndefined();
    }
  
    render(){
        if(isNullOrUndefined(this.state.order)) return <React.Fragment></React.Fragment>

        return (
            <React.Fragment>
                   <button onClick={this.backToOrders} className="btn btn-sm btn-info mr-2 mb-3">back to orders</button> 
                <OrderCardComponent order={this.state.order} 
                                    isIndexingNeeded={false} 
                                    isFullViewRequired={true}>
                    {!isNullOrUndefined(this.state.selectedWorker) && <div className="p-3 mb-2 bg-info text-white">
                      <h6 className="font-weight-bold">Worker info</h6>

                        <div><label className="font-weight-bold">Name: </label> {this.state.selectedWorker.lastName} {this.state.selectedWorker.firstName} </div>
                        <div><label className="font-weight-bold">Email: </label> {this.state.selectedWorker.email}</div>
                        <div className="d-flex">
                            <div className="m-1"><label className="font-weight-bold">City: </label> {this.state.selectedWorker.city}</div>
                            <div className="m-1"><label className="font-weight-bold">Address: </label> {this.state.selectedWorker.address}</div>
                    </div>
                   </div>}
                </OrderCardComponent>
            <OrganiseInstallationComponent customerId={this.state.order.customerId}/>
            </React.Fragment>
        )
    }
}

export default ManagerOrderCardComponent;