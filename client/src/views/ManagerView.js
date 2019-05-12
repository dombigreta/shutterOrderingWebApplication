import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import {Switch, Route} from 'react-router-dom';
import * as VIEWS from './ViewConstants';

import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import ManagerOrderCardComponent from '../components/ManagerOrderCardComponent';

class ManagerView extends React.Component{

    state = {
        orders: ManagerStore._orders,
        workers: ManagerStore._workers
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.onChange);
        ManagerActions.getAllOrders();
        ManagerActions.getWorkersDataForInstallation();
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({orders:ManagerStore._orders, workers: ManagerStore._workers});
    }

    render(){

        return(
            <Switch>
                <Route exact path='/manager' render={(props) => (
                    <OrderCardContainerComponent
                            orders={this.state.orders}
                            isFullViewRequired={true}
                            title={`Orders to handle`}
                            currentView={VIEWS.MANAGER_VIEW}
                            {...props}/>
                )}/>
                <Route path='/manager/order/:number' render={(props) => (
                     <ManagerOrderCardComponent {...props}/>
                 )}/>
            </Switch>
        )
    }
}

export default ManagerView;