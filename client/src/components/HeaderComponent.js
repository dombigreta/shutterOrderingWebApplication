import React from 'react';

import {Link} from 'react-router-dom';

class HeaderComponent extends React.Component{

    state = {
        links: [{displayName:'customer', urlName:'/customer'},
                {displayName:'worker', urlName:'/worker'},
                {displayName:'manager', urlName:'/manager'}]
    }

    createHeaderLinks = () => {
        return this.state.links.map((link, i) => 
        <li className="nav-item mr-2" key={i}>
        <Link to={link.urlName}>{link.displayName}</Link>
        </li>)
    }

    render(){
        return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {this.createHeaderLinks()}
          </ul>
        </div>
      </nav>)
    }
}

export default HeaderComponent;