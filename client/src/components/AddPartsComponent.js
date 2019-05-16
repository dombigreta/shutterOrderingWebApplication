import React from 'react';
import * as WorkerActions from '../store/WorkerStore/WorkerActions';
import WorkerStore from '../store/WorkerStore/WorkerStore';
import { isNullOrUndefined } from 'util';
import * as ORDER_STATES from '../utils/stateOfOrderConstants';
import Card from 'react-bootstrap/Card';

class AddPartsComponent extends React.Component{
    state ={
        parts: WorkerStore._parts,
        editingOrder:WorkerStore.editingOrder,
        basePrice: 0
    }

    componentDidMount(){
        WorkerStore.addChangeListener(this.handleChange);
        WorkerActions.getAllParts();
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this.handleChange)
    }

    handleChange = () => {
        this.setState({parts: WorkerStore._parts, editingOrder:WorkerStore._editingOrder},
                        () => {
                            this.setState({basePrice:WorkerStore._editingOrder.price})
                        });
    }

    finishOrder = () => {
        let orderId = this.state.editingOrder._id;
        WorkerActions.finishOrder(orderId);
        WorkerActions.getOrderById(orderId);
    }

    createAddedParts = (partId) =>{
        let part = this.state.parts.filter(x => x._id == partId)[0];
        if(isNullOrUndefined(part)) return <React.Fragment></React.Fragment>;
        return (
            <div  key={partId}  className="d-flex">
            <div>
                <label className="form-check-label">
                {part.name}
                </label>
            </div>
            <div className="ml-auto">
                <label className="font-weight-bold">price: </label> {part.price} {part.currency}
            </div>
       </div>
        )

    }

    renderfinishJobCell = () => {
        return(
            <Card className="p-3 mb-3">
            <Card.Title>Added particles</Card.Title>
            {this.state.editingOrder.parts.map(part => this.createAddedParts(part))}
            <hr/>
            <div className="d-flex">
                <div><label className="font-weight-bold">Estimated cost of order:</label></div>
                <div className="ml-auto">{this.state.editingOrder.price} HUF</div>
            </div>
            <hr/>
            <button className="btn btn-sm btn-danger mt-2" onClick={this.finishOrder}>finish order</button>

        </Card>
        )
    }

    calculateNewPrice = () => {
        let addedParts = this.state.editingOrder.parts;
        let partsPrice = this.state.parts.filter(x => {
            return addedParts.indexOf(x._id) !== -1;
        }).map(x => parseInt(x.price));
        let basePrice = this.state.basePrice;
        let newPrice = partsPrice.reduce((acc,curr) => acc + curr,basePrice);
        this.setState({editingOrder:{...this.state.editingOrder, price:newPrice}});
    }

    handleAddingParts = (part) => {
        let addedParts = this.state.editingOrder.parts;
        let indexOf = addedParts.indexOf(part);
        if(indexOf !== -1){
            addedParts.splice(indexOf,1);
        }
        else{
            addedParts.push(part);
        }
        this.setState({editingOrder:{...this.state.editingOrder,parts:addedParts}},() => this.calculateNewPrice());
    }

    startAssemblingOrder = () => {
        let order = {...this.state.editingOrder, stateOfOrder: ORDER_STATES.STARTED_ASSEMBLING}
        WorkerActions.startAssemblingOrder({order:order});
        WorkerActions.getOrderById(this.state.editingOrder._id);
    }

    renderAddParticlesCell = () => {
        return(
            <Card className="p-3 mb-3">
                <Card.Title>Particles</Card.Title>
                {this.state.parts.map(part => this.createParticlesCheckBox(part))}
                
                <hr/>
                <div className="d-flex">
                    <div><label className="font-weight-bold">Estimated cost of order:</label></div>
                    <div className="ml-auto">{this.state.editingOrder.price} HUF</div>
                </div>
                <hr/>
                <button className="btn btn-sm btn-danger mt-2" onClick={this.startAssemblingOrder}>start assembling order</button>

            </Card>
        )
    }

    createParticlesCheckBox = (part) => {
        return(
            <div  key={part._id}  className="d-flex">
                <div className="form-check">
                    <input onChange={() => this.handleAddingParts(part._id)} 
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
        )
    }


    handleRenderingByOrderState = () => {
        let state = this.state.editingOrder.stateOfOrder;
        console.log(state);
        switch(state){
            case ORDER_STATES.ASSIGNED_TO_WORKER: return this.renderAddParticlesCell();
            break;
            case ORDER_STATES.STARTED_ASSEMBLING: return this.renderfinishJobCell();
            break;
        }
    }

    render(){
        if(isNullOrUndefined(this.state.editingOrder)) return <React.Fragment></React.Fragment>
        return <div className="p-3">{this.handleRenderingByOrderState()}</div>
    }
}

export default AddPartsComponent;