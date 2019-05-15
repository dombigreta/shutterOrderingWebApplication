import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'

import * as VIEWS from './ViewConstants';


import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import StatisticsComponent from '../components/StatisticsComponent';

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

    getCurrentStatistics = () => {
        ManagerStore.getStatistics();
    }

    render(){
        return(
                <React.Fragment>
                    <StatisticsComponent/>
                    <OrderCardContainerComponent
                            orders={this.state.orders}
                            isFullViewRequired={true}
                            title={`Orders to handle`}
                            currentView={VIEWS.MANAGER_VIEW}
                            />
                </React.Fragment>
        )
    }
}

export default ManagerView;