import React from 'react';
import ManagerStore from '../store/ManagerStore/ManagerStore';
import * as ManagerActions from '../store/ManagerStore/ManagerActions'
import { isNullOrUndefined } from 'util';

class StatisticsComponent extends React.Component{

    state = {
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

    getCurrentStatistics = () => {
        this.getCurrentStatistics();
    }

    render(){
        console.log(this.state.statistics);
        if(isNullOrUndefined(this.state.statistics)) return <React.Fragment></React.Fragment>
        return (
           <React.Fragment>
               <div className="mb-3">
            <button  onClick={() => this.getCurrentStatistics} className="btn btn-info btn-small" data-toggle="modal" data-target="#statisticsModal">
                get statistics
            </button>
    </div>
      <div className="modal fade" id="statisticsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Current statistics</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div><label className="font-weight-bold">Overall revenue: </label> {this.state.statistics.overalRevenue} {this.state.statistics.currency}</div>
            <div><label className="font-weight-bold">Count of finished orders: </label> {this.state.statistics.countOfFinishedOrders}</div>
            <div><label className="font-weight-bold">Count of not assembled orders: </label> {this.state.statistics.countOfNotAssembledOrders}</div>
            <div><label className="font-weight-bold">Count of assembling orders: </label> {this.state.statistics.countOfAssemblingOrders}</div>
            <div><label className="font-weight-bold">Count of ordered shutters: </label> {this.state.statistics.countOfOrderedShutters}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment> 
        )

    }


}

export default StatisticsComponent
