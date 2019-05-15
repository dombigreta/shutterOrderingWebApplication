import React from 'react';
import { ErrorMessageComponent } from './MessageComponents';

class WindowDetailsComponent extends React.Component{



    render(){
        let {window ,index, handleWindowDetailsChange, isDisabled} = this.props;


        return(
            <div key={index}>
            <div className="d-flex row">
        <div className="form-group col-6">
            <label className="font-weight-bold">height</label>
            <div className="input-group input-group-sm">
            <input type="text"  className="form-control form-control-sm"
                                value={window.height}
                                style={{borderColor: window.validation.height.isInvalid ? 'red' : ''}}
                                name="height" 
                                disabled={isDisabled}
                                placeholder="height"
                                onChange={(e) => handleWindowDetailsChange(e,index)}
                                required/>
            <div className="input-group-append">
                <span className="input-group-text">cm</span>
            </div>
            </div>
            {window.validation.height.isInvalid && <ErrorMessageComponent message={window.validation.height.message}/>}
        </div>
        <div className="form-group col-6">
            <label className="font-weight-bold">width</label>
            <div className="input-group input-group-sm">
            <input type="text"  className="form-control form-control-sm"
                                value={window.width}
                                style={{borderColor:window.validation.width.isInvalid? 'red': ''}}
                                name="width" 
                                disabled={isDisabled} 
                                placeholder="width"
                                onChange={(e) => handleWindowDetailsChange(e,index)}
                                required/>
                <div className="input-group-append">
                    <span className="input-group-text">cm</span>
                </div>
            </div>
            {window.validation.width.isInvalid && <ErrorMessageComponent message={window.validation.width.message}/>}
        </div>
        </div>
    {/** shutters */}
    <div className="mb-5">
    <h5>Choose a shutter</h5>
     {this.props.children}
    </div>
    </div>
       )
    }

}

export default WindowDetailsComponent;