import React from 'react';

import {NavLink} from 'react-router-dom';

class HeaderComponent extends React.Component{

    state = {
        links: [{displayName:'customer', urlName:'/customer'},
                {displayName:'worker', urlName:'/worker'},
                {displayName:'manager', urlName:'/manager'}]
    }

    createHeaderLinks = () => {
        return this.state.links.map((link, i) => 
        <li className="nav-item mr-2" key={i}>
        <NavLink to={link.urlName}>{link.displayName}</NavLink>
        </li>)
    }

    render(){
        return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>
          <ul className="navbar-nav">
            {this.createHeaderLinks()}
          </ul>
        </div>
      </nav>)
    }
}

export default HeaderComponent;