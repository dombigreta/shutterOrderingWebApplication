import React from 'react';
import { isNullOrUndefined } from 'util';


class ShutterCheckBoxComponent extends React.Component{

    handleChange = (e) => {
        let value = e.target.value;
        this.props.handleShutterTypeChange(value, this.props.index);
    }
    createShutterCheckBox = (shutter) => {
        return (
            <div key={shutter._id} className="form-check fancy-font-size">
            <input type="checkbox"  checked={this.props.window.shutter === shutter._id} 
                                    className="form-check-input"
                                    name="selectedShutterOption" 
                                    value={shutter._id}
                                    disabled={this.props.isDisabled}
                                    onChange={this.handleChange}/>
            <label className="form-check-label font-weight-bold" htmlFor={shutter.shutterName}>
              Name: {shutter.name}
            </label>
            <label className="ml-3 font-weight-bold">Price:</label> {shutter.basePrice} {shutter.currency}/m<sup>2</sup>
          </div>
        )
    }

    render(){
        if(isNullOrUndefined(this.props.shutterTypes)) return <React.Fragment></React.Fragment>
   
       return( 
        <React.Fragment>
        {this.props.shutterTypes.map(shutter => this.createShutterCheckBox(shutter))}
        </React.Fragment>
       )
    }
}

export default ShutterCheckBoxComponent;