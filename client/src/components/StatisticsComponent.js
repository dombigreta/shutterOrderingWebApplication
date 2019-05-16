import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import { isNullOrUndefined } from 'util';
import Modal from 'react-bootstrap/Modal';
class StatisticsComponent extends React.Component{

    state = {
        show:false,
        statistics: ManagerStore._statistics
    }

    componentDidMount(){
        ManagerStore.addChangeListener(this.handleChange);
        ManagerActions.getStatistics();
    }


    componentWillUnmount(){
        ManagerStore.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({statistics: ManagerStore._statistics})
    }

    handleHide = () => {

    }

    getCurrentStatistics = () => {
        this.getCurrentStatistics();
    }

    render(){
       
        if(isNullOrUndefined(this.state.statistics)) return <React.Fragment></React.Fragment>
        return (  
            <React.Fragment></React.Fragment>
            )

    }


}

export default StatisticsComponent
