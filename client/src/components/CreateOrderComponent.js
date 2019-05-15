import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';
import { isNullOrUndefined } from 'util';
import ShutterCheckBoxComponent from '../components/ShuttercheckboxComponent';

class CreateOrderComponent extends React.Component{
    state = {
        shutterTypes: CustomerStore._shutterTypes,
        customerData: CustomerStore._customerData,
        windowsDetails:[],
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
                                this.calculateBasePriceByWindowDetails();
                            }
                });
    }


    calculateBasePriceByWindowDetails = () => {
        let price = 0;
        this.state.windowsDetails.map(window => {
            let shutter = this.state.shutterTypes.filter(shutter => shutter._id === window.shutter)[0];
            if(!isNullOrUndefined(shutter)){
                price += Math.round(shutter.basePrice * ((window.height /100)* (window.width/100)),2);
            }
        })
        this.setState({basePrice:price});
        
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
            price: this.state.basePrice,
            currency:"HUF",
            windows: this.state.windowsDetails,
            workerId:null,
            parts:[ ]
        }

        CustomerActions.createOrder(order);
        
    }

    handleWindowDetailsChange = (e, index) => {

        let name = e.target.name;
        let value = e.target.value;

        let window = this.state.windowsDetails[index];
        window[name] = parseInt(value) || 0;
        this.setState({
            windowDetails:[...this.state.windowsDetails, 
                window]
        });

        this.calculateBasePriceByWindowDetails()
    }

    handleAddingNewWindow = () => {
        this.setState({
            windowsDetails: [...this.state.windowsDetails, {height:0,width:0,shutter:this.state.shutterTypes[0]._id}]
        })
    }

    handleShutterTypeChange(shutterId,index){
       let window = this.state.windowsDetails[index];
       let indexOf = this.state.windowsDetails.indexOf(window);
       if(indexOf !== -1){
           window.shutter = shutterId
           let newDetails = this.state.windowsDetails.splice(indexOf,1,window);
           this.setState({
               windowDetails:newDetails
           }, () => this.calculateBasePriceByWindowDetails());
       }
    }

    createWindowDetailsRow = (window,index) => {
       return (
        <div key={index}>
                <div className="d-flex row">
            <div className="form-group col-6">
                <label className="font-weight-bold">height</label>
                <div className="input-group input-group-sm">
                <input type="text"  className="form-control form-control-sm" 
                                    value={window.height} 
                                    name="height" 
                                    placeholder="height"
                                    onChange={(e) => this.handleWindowDetailsChange(e,index)}
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
                                    value={window.width}
                                    name="width"  
                                    placeholder="width"
                                    onChange={(e) => this.handleWindowDetailsChange(e,index)}
                                    required/>
                    <div className="input-group-append">
                        <span className="input-group-text">cm</span>
                    </div>
                </div>
            </div>
            </div>
        {/** shutters */}
        <div className="mb-5">
        <h5>Choose a shutter</h5>
            <ShutterCheckBoxComponent ShutterTypes={this.state.shutterTypes} window={window} index={index}
            handleShutterTypeChange={(shutterId, index) => this.handleShutterTypeChange(shutterId, index)}/>
        </div>
        </div>
       )
    }

    render(){
        if(this.state.shutterTypes.length === 0 || this.state.customerData === undefined) return <div></div>
        return(
            <div className="p-3 mt-2 bg-light text-dark rounded-container mb-3">
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
         <h5>Window's parameters</h5>
         {this.state.windowsDetails.map((window,index) => this.createWindowDetailsRow(window,index))}
           <button onClick={this.handleAddingNewWindow} className="btn btn-sm btn-danger">Add new window</button>
         </div>
         <label className="font-weight-bold">Net price</label> : {this.state.basePrice + ' HUF'}
         <div>

        </div>
        <button onClick={this.handleSubmit} className="btn btn-primary btn-sm">Submit your order</button>
    </div>)
    }
}

export default CreateOrderComponent;