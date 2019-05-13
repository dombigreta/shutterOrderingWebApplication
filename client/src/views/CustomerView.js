import React from 'react';
import  * as CustomerActions from '../store/CustomerStore/CustomerActions';
import CustomerStore from '../store/CustomerStore/CustomerStore';
import  CreateOrderComponent from '../components/CreateOrderComponent'
import * as VIEWS from './ViewConstants';

import OrderCardContainerComponent from '../components/OrderCardContainerComponent';


class CustomerView extends React.Component{

    state = {
        ownOrders:CustomerStore._ownOrders
    }
    
    componentDidMount(){
        CustomerStore.addChangeListener(this.onChange);
        CustomerActions.getOwnOrders();
       
    }
    componentWillUnmount(){
        CustomerStore.removeChangeListener(this.onChange);
    }

    
    onChange = () => {
        this.setState({ownOrders: CustomerStore._ownOrders});
    }

    render(){
        return(
            <React.Fragment>
                <OrderCardContainerComponent orders={this.state.ownOrders} 
                    isWorkerView={false}
                    isFullViewRequired={false}
                    title={`Your own orders`}
                    currentView={VIEWS.CUSTOMER_VIEW}/>       
                <CreateOrderComponent/>
            </React.Fragment>)
    }
}

export default CustomerView;