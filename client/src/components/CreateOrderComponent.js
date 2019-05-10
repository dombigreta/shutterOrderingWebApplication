import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';

class CreateOrderComponent extends React.Component{
    state = {
        shutterTypes: CustomerStore._shutterTypes,
        customerData: CustomerStore._customerData,
        windowDetails:{
            width:0,
            height:0
        },
        selectedShutterOption:0,
        currency:'HUF',
        basePrice:0
    }

    componentDidMount(){
        CustomerStore.addChangeListener(this.onChange)
        CustomerActions.getShutterTypes();
        CustomerActions.getCustomerData();
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({shutterTypes: CustomerStore._shutterTypes, 
                        customerData:CustomerStore._customerData,},
                        () => {
                            if(this.state.shutterTypes !== undefined && this.state.shutterTypes.length > 0){
                                this.setState({selectedShutterOption: this.state.shutterTypes[0]._id,
                                                windowDetails:{height:0,width:0},
                                                basePrice:0})
                            }
                });
    }
    createShutterCell = (shutter) => {
        return (
            <div key={shutter._id} className="form-check fancy-font-size">
            <input type="checkbox"  checked={this.state.selectedShutterOption === shutter._id} 
                                    className="form-check-input"
                                    name="selectedShutterOption" 
                                    value={shutter._id}
                                    onChange={this.handleChange}/>
            <label className="form-check-label font-weight-bold" htmlFor={shutter.shutterName}>
              Name: {shutter.name}
            </label>
            <label className="ml-3 font-weight-bold">Price:</label> {shutter.basePrice} {shutter.currency}/m<sup>2</sup>
          </div>
        )
    }

    calculateBasePriceByWindowDetails = () => {
        let selectedShutter = this.state.shutterTypes.filter(x => x._id === this.state.selectedShutterOption)[0];
        if(selectedShutter === undefined) return;
        return Math.round(selectedShutter.basePrice * ((this.state.windowDetails.height / 100) * (this.state.windowDetails.width / 100)),2);
        
    }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let order = {
            customerId:this.state.customerData._id,
            dueDateOfAssembling : null,
            dateOfSubmittingOrder: new Date(),
            isInProgress : false,
            isDone:false,
            isPayed : false,
            price: this.calculateBasePriceByWindowDetails(),
            currency:"HUF",
            window: this.state.windowDetails,
            shutter: this.state.selectedShutterOption,
            parts:[ ]
        }

        CustomerActions.createOrder(order);
        
    }

    handleWindowDetailsChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            windowDetails:{
                ...this.state.windowDetails,
                [name]:value
            }
        })
    }

    render(){
        if(this.state.shutterTypes.length === 0 || this.state.customerData === undefined) return <div></div>
        return(
            <form className="p-3 mt-2 bg-light text-dark" onSubmit={this.handleSubmit}>
                <h3>Create a new order</h3>

        {/** basic info */}
        <div className="mb-3">
                <h5>Customer Info</h5>
                <div className="d-flex row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">First Name</label>
                    <input type="text" className="form-control form-control-sm" disabled={true} value={this.state.customerData.firstName}/>
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Last Name</label>
                    <input type="text" className="form-control form-control-sm" disabled={true} value={this.state.customerData.lastName}/>
                </div>
            </div>
        </div>

        {/**shipping info */}
        <div className="mb-3">
            <h5>Shipping info</h5>
                <div className="form-group">
                    <label className="font-weight-bold">City</label>
                    <input type="text" className="form-control form-control-sm" disabled={true} value={this.state.customerData.city}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Address</label>
                    <input type="email" className="form-control form-control-sm" disabled={true} value={this.state.customerData.address}/>
                </div>
        </div>
        
        {/**window info */}
        <div className="mb-3">
         <h5>Window parameters</h5>
         <div className="d-flex row">
        <div className="form-group col-6">
            <label className="font-weight-bold">height</label>
            <div className="input-group input-group-sm">
            <input type="text"  className="form-control form-control-sm" 
                                value={this.state.windowDetails.height} 
                                name="height" 
                                placeholder="height"
                                onChange={this.handleWindowDetailsChange}
                                required/>
            <div className="input-group-append">
                <span className="input-group-text">cm</span>
            </div>
            </div>
        </div>
        <div className="form-group col-6">
            <label className="font-weight-bold">width</label>
            <div className="input-group input-group-sm">
            <input type="text"  className="form-control form-control-sm" 
                                value={this.state.windowDetails.width}
                                name="width"  
                                placeholder="width"
                                onChange={this.handleWindowDetailsChange}
                                required/>
                 <div className="input-group-append">
                    <span className="input-group-text">cm</span>
                </div>
            </div>
        </div>
        </div>
         </div>
        {/** shutters */}
        <div className="mb-5">
         <h5>Choose a shutter</h5>
         <div className="mb-3">
            {this.state.shutterTypes.map((shutter) => this.createShutterCell(shutter))}
        </div>
            <label className="font-weight-bold">Net price</label> : {this.calculateBasePriceByWindowDetails() + ' HUF'}
         </div>
         <div>

        </div>
        <button type="submit" className="btn btn-primary btn-sm">Submit your order</button>
    </form>)
    }
}

export default CreateOrderComponent;