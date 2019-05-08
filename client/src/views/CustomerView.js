import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';

class CustomerView extends React.Component{

    state = {
        ownOrders:CustomerStore._ownOrders,
        shutterTypes:CustomerStore._shutterTypes

    }
    
    componentDidMount(){
        CustomerStore.addChangeListener(this.onChange);
        CustomerActions.getOwnOrders();
        CustomerActions.getShutterTypes();
       
    }
    onChange = () => {
        this.setState({ownOrders: CustomerStore._ownOrders, shutterTypes: CustomerStore._shutterTypes});
    }

    componentWillUnmount(){
        CustomerStore.removeChangeListener(this.onChange);
    }

    createOrderCell = (order) => {
        return (<div key={order._id}>{order.dateOfOrdering}</div>)
    }

    createShutterCell = (shutter) => {
        return (
            <div key={shutter._id} className="form-check">
            <input type="checkbox" className="form-check-input" id={shutter.shutterName}/>
            <label className="form-check-label" htmlFor={shutter.shutterName}>
              Name: {shutter.shutterName}
            </label>
            <label className="ml-3">Price/m2: {shutter.basePrice} Ft</label>
            <label className="ml-3">{shutter.isExterior ? 'exterior' : 'interior'}</label>
          </div>
        )
    }
    render(){
        return(
            <div>
                View your orders
            {
              this.state.ownOrders.map((order) => {
                    return this.createOrderCell(order)
              })
            }
           
    <form className="p-3 mt-2 bg-light text-dark">
        <h3>Create a new order</h3>

         <div className="mb-5">
         <h5>Personal info</h5>
         <div className="d-flex row">
        <div className="form-group col-6">
            <label>First Name</label>
            <input type="email" className="form-control form-control-sm" id="firstname"  placeholder="first name"/>
        </div>
        <div className="form-group col-6">
            <label>Last Name</label>
            <input type="email" className="form-control form-control-sm" id="lastname"  placeholder="last name"/>
        </div>
        </div>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control form-control-sm" id="email" placeholder="email"/>
        </div>
         </div>

        <div className="mb-5">
         <h5>Your window's parameter</h5>
         <div className="d-flex row">
        <div className="form-group col-6">
            <label>height</label>
            <input type="email" className="form-control form-control-sm" id="height" placeholder="height"/>
        </div>
        <div className="form-group col-6">
            <label>width</label>
            <input type="email" className="form-control form-control-sm" id="width"  placeholder="width"/>
        </div>
        </div>
         </div>

          <div>
         <h5>Choose a shutter</h5>
         <div className="mb-5">
            {this.state.shutterTypes.map((shutter) => this.createShutterCell(shutter))}
        </div>
         </div>
        <button className="btn btn-primary">Submit your order</button>
    </form>
            </div>)
    }
}

export default CustomerView;