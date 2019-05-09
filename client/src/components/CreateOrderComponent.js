import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';

class CreateOrderComponent extends React.Component{
    state = {
        shutterTypes: CustomerStore._shutterTypes,
        customerData:{
            firstname:'',
            lastname:'',
            email:'',
        },
        windowDetails:{
            width:0,
            height:0
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
        this.setState({shutterTypes: CustomerStore._shutterTypes});
    }
    createShutterCell = (shutter) => {
        return (
            <div key={shutter._id} className="form-check fancy-font-size">
            <input type="checkbox" className="form-check-input" id={shutter.shutterName}/>
            <label className="form-check-label font-weight-bold" htmlFor={shutter.shutterName}>
              Name: {shutter.name}
            </label>
            <label className="ml-3 font-weight-bold">Price/m2:</label> {shutter.basePrice} {shutter.currency} 
          </div>
        )
    }

    handleChange = (e) => {
        e.preventDefault();
    }

    render(){
        console.log(this.props.customerData);
        return(
            <form className="p-3 mt-2 bg-light text-dark">
                <h3>Create a new order</h3>

         <div className="mb-3">
                <h5>Personal info</h5>
                <div className="d-flex row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">First Name</label>
                    <input type="email" className="form-control form-control-sm" id="firstname"  name="email" placeholder="first name"/>
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Last Name</label>
                    <input type="text" className="form-control form-control-sm" id="lastname"  placeholder="last name"/>
                </div>
        </div>

        <div className="form-group">
            <label className="font-weight-bold">Email address</label>
            <input type="email" className="form-control form-control-sm" id="email" placeholder="email"/>
        </div>
         </div>

        <div className="mb-3">
         <h5>Your window's parameter</h5>
         <div className="d-flex row">
        <div className="form-group col-6">
            <label className="font-weight-bold">height</label>
            <input type="text" className="form-control form-control-sm" id="height" placeholder="height"/>
        </div>
        <div className="form-group col-6">
            <label className="font-weight-bold">width</label>
            <input type="text" className="form-control form-control-sm" id="width"  placeholder="width"/>
        </div>
        </div>
         </div>

          <div>
         <h5>Choose a shutter</h5>
         <div className="mb-3">
            {this.state.shutterTypes.map((shutter) => this.createShutterCell(shutter))}
        </div>
         </div>
        <button className="btn btn-primary">Submit your order</button>
    </form>
        )
    }
}

export default CreateOrderComponent;