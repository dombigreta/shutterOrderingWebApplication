import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as VIEWS from './ViewConstants';

import ShutterChart from '../components/charts/ShutterChart';
import OrderCardContainerComponent from '../components/OrderCardContainerComponent';
import StatisticsComponent from '../components/StatisticsComponent';

class ManagerView extends React.Component{

    state = {
        orders: ManagerStore._orders,
        workers: ManagerStore._workers,
        shutterData: ManagerStore._shutterData,
        showStatistics:false
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.onChange);
        ManagerActions.getAllOrders();
        ManagerActions.getWorkersDataForInstallation();
        ManagerActions.getShuttersDataForStatistics();
    }

    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({orders:ManagerStore._orders, 
                        workers: ManagerStore._workers, 
                        shutterData: ManagerStore._shutterData});
    }

    handleHideStatisticsModal = () => {
        this.setState({showStatistics:false});
    }

    handleShowStatisticsModal = () => {
        this.setState({showStatistics:true});
    }

    getCurrentStatistics = () => {
        ManagerStore.getStatistics();
    }

    render(){
        return(
                <React.Fragment>
                   <div className="mb-3">
                   <Button onClick={this.handleShowStatisticsModal} size={'sm'} 
                    variant="info">statistics</Button>
                    </div>

                    <OrderCardContainerComponent
                            orders={this.state.orders}
                            isFullViewRequired={false || this.state.orders.length == 1}
                            title={`Orders to handle`}
                            currentView={VIEWS.MANAGER_VIEW}/>

                    <Modal size={'lg'} show={this.state.showStatistics} onHide={this.handleHideStatisticsModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Statistics</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ShutterChart shutterData={this.state.shutterData}/></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHideStatisticsModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                    </Modal>
                </React.Fragment>
        )
    }
}

export default ManagerView;