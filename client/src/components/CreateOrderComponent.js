import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';
import { isNullOrUndefined } from 'util';
import ShutterCheckBoxComponent from '../components/ShuttercheckboxComponent';
import ValidationObject from '../utils/validationObject';
import WindowDetailsComponent from './WindowDetailsComponent';
import { ErrorMessageComponent } from './MessageComponents';

class CreateOrderComponent extends React.Component{
    
    constructor(){
        super();

        this.state = {
            shutterTypes: CustomerStore._shutterTypes,
            customerData: CustomerStore._customerData,
            windowsDetails:[],
            currency:'HUF',
            basePrice:0,
            isSubmitted:false,
            isSubmissionSuccessful:false,
        }

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
        this.setState({isSubmitted:true});
        if(!this.validateOrder()){
            return;
        }
        let order = {
            customerId:this.state.customerData._id,
            dueDateOfAssembling : null,
            dateOfSubmittingOrder: new Date(),
            price: this.state.basePrice,
            currency:"HUF",
            windows: this.state.windowsDetails.map(x =>({height:x.height, width:x.width, shutter:x.shutter})),
            workerId:null,
            parts:[ ]
        }
        CustomerActions.createOrder(order);
        this.setState({isSubmissionSuccessful:true})
    }

    validateOrder = () => {
        let isValid = true;
        if(this.state.windowsDetails.length == 0) {
            isValid = false;
        }
         this.state.windowsDetails.forEach((window,index) => {
           if(!this.validateWindowDetails(index)){
               isValid = false;
           }
         });


       return isValid;
    }

    validateWindowDetails = (index) => {
        let window = this.state.windowsDetails[index];
        let indexOf = this.state.windowsDetails.indexOf(window);
        if(indexOf !== -1){
            const validation = window.validator.validate(window);
            window.validation = validation;
            let newDetails = this.state.windowsDetails.splice(indexOf,1,window);
            this.setState({windowDetails:newDetails});
        }

        return window.validation.isValid;
    }

    handleWindowDetailsChange = (e, index) => {
        let window = this.state.windowsDetails[index];
        let indexOf = this.state.windowsDetails.indexOf(window);
        if(indexOf !== -1){
            let name = e.target.name;
            let value = e.target.value
            window[name] = parseInt(value) || 0;
            let newDetails = this.state.windowsDetails.splice(indexOf,1,window);
            this.setState({ windowDetails:newDetails},() => {
                this.calculateBasePriceByWindowDetails()
                if(this.state.isSubmitted){
                    this.validateWindowDetails(index);
                }
            });
        }
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
 

    handleAddingNewWindow = () => {
        let validationObj = new ValidationObject([
                    {
                    field: 'width', 
                    method: this.isGreaterThanZero, 
                    validWhen: false, 
                    message: 'Width must be greater than zero' 
                    },
                    {
                        field: 'height', 
                        method: this.isGreaterThanZero, 
                        validWhen: false, 
                        message: 'Height must be greater than zero' 
                    }]);

        this.setState({
            windowsDetails: [...this.state.windowsDetails, {height:0,width:0,shutter:this.state.shutterTypes[0]._id, validator:validationObj, validation:validationObj.valid()}]
        })
    }

    isGreaterThanZero = (input) => input > 0;


    createWindowDetailsRow = (window,index) => {
       return (
      <WindowDetailsComponent key={index} isDisabled={this.state.isSubmissionSuccessful} window={window} index={index} handleWindowDetailsChange={this.handleWindowDetailsChange}>
             <ShutterCheckBoxComponent shutterTypes={this.state.shutterTypes} window={window} index={index}
                handleShutterTypeChange={(shutterId, index) => this.handleShutterTypeChange(shutterId, index)}/>
      </WindowDetailsComponent>
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
         {this.state.isSubmitted && this.state.windowsDetails.length == 0 && <ErrorMessageComponent message={'You must at least add one window!'}/>}
         <label className="font-weight-bold">Net price</label> : {this.state.basePrice + ' HUF'}
         <div>

        </div>
        <button onClick={this.handleSubmit} disabled={this.state.isSubmissionSuccessful} className="btn btn-primary btn-sm">Submit your order</button>
    </div>)
    }
}

export default CreateOrderComponent;