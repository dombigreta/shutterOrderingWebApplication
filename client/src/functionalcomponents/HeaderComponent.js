import React from 'react';
import Nav from 'react-bootstrap/Nav';

import * as VIEW_CONSTANTS from '../store/ViewStore/ViewConstants';
import * as ViewActions from '../store/ViewStore/ViewActions';



class HeaderComponent extends React.Component{

    state = {
        links: [{displayName:'customer', actionName:VIEW_CONSTANTS.SHOW_CUSTOMER_VIEW},
                {displayName:'manager', actionName:VIEW_CONSTANTS.SHOW_MANAGER_VIEW},
                {displayName:'worker', actionName:VIEW_CONSTANTS.SHOW_WORKER_VIEW}
                ]
    }

    createLinks = (link, index) =>{
        return (
            <Nav.Item>
            <Nav.Link eventKey={link.actionName} key={index}>
                {link.displayName}
                </Nav.Link>
            </Nav.Item>
        )
    }

    handleSelect  = (eventKey) => {
        ViewActions.handleViewChange({
            view:eventKey
        })
    }

    render(){
        return (
            <Nav  className="justify-content-center" onSelect={e => this.handleSelect(e)}>
                    {this.state.links.map((link,index) => this.createLinks(link,index))}
            </Nav>
        )
    }
}


export default HeaderComponent;