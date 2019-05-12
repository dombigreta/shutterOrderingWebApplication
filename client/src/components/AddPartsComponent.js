import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
import { isNullOrUndefined } from 'util';

class AddPartsComponent extends React.Component{
    state ={
        parts: WorkerStore._parts,
        editingOrder:WorkerStore.editingOrder,
        calculatedPrice: 0
    }

    componentDidMount(){
        WorkerStore.addChangeListener(this.handleChange);
        WorkerActions.getAllParts();
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.handleChange)
    }

    handleChange = () => {
        this.setState({parts: WorkerStore._parts, 
                        editingOrder:WorkerStore._editingOrder}, () => {
                            this.setState({calculatedPrice:WorkerStore._editingOrder.price})
                        });
    }

    handleAddingParts = (part) => {
        if(isNullOrUndefined(this.state.editingOrder)){
            return;
        }
        let indexOf = this.state.editingOrder.parts.indexOf(part._id);
        if(indexOf === -1){
            this.state.editingOrder.parts.push(part._id);
            this.setState(
                {calculatedPrice:this.state.calculatedPrice += parseInt(part.price)}
            );

        }
        else{
            this.state.editingOrder.parts.splice(part._id,1);
            this.setState(
                {calculatedPrice:this.state.calculatedPrice -= parseInt(part.price)}
            )
        }

    }

    handleAssemblingOrder = () => {
        let editingOrder = {
            ...this.state.editingOrder,
            price: this.state.calculatedPrice,
            isInProgress:true
        }

        WorkerActions.startAssemblingOrder(editingOrder);
        WorkerActions.getOrderById(this.state.editingOrder._id);
        WorkerActions.getAllOrders();
    }

    handleFinishingOrder = () => {
        WorkerActions.finishOrder(this.state.editingOrder._id);
        WorkerActions.getOrderById(this.state.editingOrder._id);
        WorkerActions.getAllOrders();
    }



    createPartCheckBox = (part) => {
        return (
           <div  key={part._id}  className="d-flex">
                <div className="form-check">
                    <input onChange={() => this.handleAddingParts(part)} 
                            className="form-check-input" type="checkbox" 
                            value={part._id} id={part._id}
                            disabled={this.props.order.isInProgress}/>
                    <label className="form-check-label" htmlFor={part._id}>
                    {part.name}
                    </label>
                </div>
                <div className="ml-auto">
                    <label className="font-weight-bold">price: </label> {part.price} {part.currency}
                </div>
           </div>
        );
    }

    createAddedPartsList = (partId) => {
        if(this.state.parts.length == 0) return <React.Fragment></React.Fragment>
        let part = this.state.parts.filter(part => part._id === partId)[0];
        if(isNullOrUndefined(part)) return <React.Fragment></React.Fragment>
        return(
            <li key={part._id}>{part.name}</li>
        )
    }
    createAddParts = () => {
        return (<div>
                        <div className="mb-3">
                      {this.state.parts.map(part => this.createPartCheckBox(part))}
                        </div>
                    <div className="mb-3">
                        </div>
                </div>)
    }

    render(){
        if(isNullOrUndefined(this.state.editingOrder)) return <React.Fragment></React.Fragment>
        if(!this.state.editingOrder.isDone && !this.state.editingOrder.isInProgress){
            return (
                <React.Fragment>
                {this.createAddParts()}
                <div className="mb-3">
                    <div><label className="font-weight-bold">Price:</label> {this.state.calculatedPrice} {this.state.editingOrder.currency}</div>
                    <div><button onClick={this.handleAssemblingOrder} className="btn btn-sm btn-info">Start Assembling Order</button></div>
                </div>
            </React.Fragment>
            )
        }
        else{
            return(
                <React.Fragment>
                {this.state.editingOrder.parts.map(part => this.createAddedPartsList(part))}
                <div className="mb-3">
                    <div><button disabled={this.state.editingOrder.isDone} onClick={this.handleFinishingOrder} className="btn btn-sm btn-danger">Finish Order</button></div>
                </div>
            </React.Fragment>
            )
        }
    }
}

export default AddPartsComponent;