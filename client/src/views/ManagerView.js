import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import {Switch, Route} from 'react-router-dom';
import * as VIEWS from './ViewConstants';

import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import OrderCardComponent from '../components/OrderCardComponent';

class ManagerView extends React.Component{

    state = {
        orders: ManagerStore._orders,
        editingOrder:null
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.onChange);
        ManagerActions.getAllOrders();
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({orders:ManagerStore._orders});
    }


    handleOrderSelection = (orderId) => {
        let order = this.state.orders.filter(order => order._id == orderId)[0];
        this.setState({editingOrder:order});
    }

    render(){
        return(
            <Switch>
                <Route exact path='/manager' render={(props) => (
                    <OrderCardContainerComponent
                            orders={this.state.orders}
                            setEditingOrder={(orderId) => this.handleOrderSelection(orderId)} 
                            isFullViewRequired={true}
                            title={`Finished jobs`}
                            currentView={VIEWS.MANAGER_VIEW}
                            {...props}/>
                )}/>
                <Route path='/manager/:number' render={(props) => (
                     <OrderCardComponent order={this.state.editingOrder} {...props} />
                 )}/>
            </Switch>
        )
    }
}

export default ManagerView;