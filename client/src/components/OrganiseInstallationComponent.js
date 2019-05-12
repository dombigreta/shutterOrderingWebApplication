import React from 'react';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import ManagerStore from '../store/ManagerStore/ManagerStore';


class OrganiseInstallationComponent extends React.Component{

    
    renderCustomerInformationCard = () => {
        return <div>hi there</div>
    }
 
    render(){
        return (
            <React.Fragment>
            {this.props.isDone && this.renderCustomerInformationCard()}
            </React.Fragment>
        )
    }
}

export default OrganiseInstallationComponent;