import React from 'react';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import ManagerStore from '../store/ManagerStore/ManagerStore';
import { isNullOrUndefined } from 'util';
import * as ORDER_STATES from '../utils/stateOfOrderConstants';
import Card from 'react-bootstrap/Card';


class OrganiseInstallationComponent extends React.Component{

    state = {
        editingOrder: ManagerStore._editingOrder,
        customerData: ManagerStore.customerData,
        workers: ManagerStore._workers,
        selectedWorker:null
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.handleChange);
        ManagerActions.getCustomerDataByCustomerId(this.props.customerId);

       
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({editingOrder:ManagerStore._editingOrder, 
                        customerData: ManagerStore._customerData,
                        workers:ManagerStore._workers}, () => {
                            if(this.state.workers.length !== 0){
                                this.setState({selectedWorker: ManagerStore._workers[0]});
                            }
                        });
    }
    
    renderCustomerInformationCard = () => {
        if(isNullOrUndefined(this.state.customerData)) return <React.Fragment></React.Fragment>
        return (
            <div className="p-3">
            <Card className="p-3 mb-3">
            <Card.Title>Customer information</Card.Title>
            <div><label className="font-weight-bold mr-3">Name:</label> {this.state.customerData.lastName} {this.state.customerData.firstName}</div>
               <div><label className="font-weight-bold mr-3">Email:</label>{this.state.customerData.email}</div>
               <div className="p-3 mb-2 bg-info text-white">
                  <h6 className="font-weight-bold">Shipping details</h6>
                    <div className="d-flex">
                    <div className="m-1"><label className="font-weight-bold">City: </label> {this.state.customerData.city}</div>
                    <div className="m-1"><label className="font-weight-bold">Address: </label> {this.state.customerData.address}</div>
                    </div>
               </div>
        <button className="btn btn-sm btn-danger mb-3" onClick={this.handleCreatingInvocie}>create invoce</button>
        </Card>
        </div>
        )
    }

    selectWorker = (worker) => {
        this.setState({selectedWorker:worker});
    }

    handleOrganisingJob = () => {
        let orderId = this.state.editingOrder._id;
        let workerId = this.state.selectedWorker._id;
        ManagerActions.organiseInstallation(orderId,workerId);
        ManagerActions.getOrderById(orderId);
    }

    handleCreatingInvocie = () => {
        let orderId = this.state.editingOrder._id;
        let customerId = this.state.customerData._id;
        let shutterId = this.state.editingOrder.shutter;
        if(isNullOrUndefined(orderId) || isNullOrUndefined(customerId)){
            return;
        }
        ManagerActions.createInvoice(orderId,customerId,shutterId);
        ManagerActions.getOrderById(orderId);
    }

    renderWorkerDropDown = () =>{
      return( <div>
                <h4 className="mb-3 mt-3">Select a worker to finish the job</h4>
             <div className="d-flex">
             <div className="dropdown mr-3">
                <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                    {(!isNullOrUndefined(this.state.selectedWorker) && (this.state.selectedWorker.lastName +' '+ this.state.selectedWorker.firstName))
                     || 'select a worker' }
                </button>
            <div className="dropdown-menu" id="dropdown" aria-labelledby="dropdownMenuButton">
                {this.state.workers.map((worker) => <span key={worker._id} onClick={() => this.selectWorker(worker)} className="dropdown-item">{worker.lastName} {worker.firstName}</span>)}
            </div>
            </div>
            <button className="btn btn-sm btn-info" onClick={this.handleOrganisingJob}>Start organising job</button>
             </div>
          </div>
            );
    }

    handleRenderingByOrderState = () =>{
        let state = this.state.editingOrder.stateOfOrder;
        switch(state) {
            case ORDER_STATES.DONE: return this.renderCustomerInformationCard();
            break;
            case ORDER_STATES.SUBMITTED:return this.renderWorkerDropDown();
            break;
        }
    }
 
    render(){

        return (
            <React.Fragment>
            {this.handleRenderingByOrderState()}
            </React.Fragment>
        )
    }
}

export default OrganiseInstallationComponent;