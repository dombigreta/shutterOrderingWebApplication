import React from 'react';
import OrderCardComponent from '../components/OrderCardComponent';



class OrderCardContainerComponent extends React.Component{

    render(){
        if(this.props.orders === undefined || this.props.orders.length === 0){
            return (
                <React.Fragment>
                No orders to show
                </React.Fragment>
            )
        } 

        return(
            <React.Fragment>
                <h4>{this.props.title}</h4>
                    <div className={`${this.props.isFullViewRequired ? 'worker-container-style' : 'customer-container-style'}`}>
                        {this.props.orders.map((order,index) => (
                        <OrderCardComponent order={order} 
                                            index={index + 1}
                                            isIndexingNeeded={true} 
                                            isFullViewRequired={this.props.isFullViewRequired || this.props.orders.length === 1}/>))
                    }
                    </div>
            </React.Fragment>
        )
    }

}

export default OrderCardContainerComponent;