import React from 'react';
import HeaderComponent from './HeaderComponent';


class MainContainerComponent extends React.Component{

    render(){
        return (
            <React.Fragment>
            <HeaderComponent/>
            <div className="container">
                <div className="row">
                    <div id="container" className="col-lg-9 col-sm-12 mx-auto">
                        {/**for rendering react content */}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default MainContainerComponent;