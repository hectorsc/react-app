import React from "react";
import { logOut } from '../api/apiActions';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
   
   onClick = async () => {
      await logOut();
      localStorage.removeItem("token");
      window.location.reload();  
   }

   render() {
      return (
         <div className="ui top fixed inverted menu main">
            <div className="item">
               <div className="content">
                  <Link to="/" className="header ui inverted">Hola {this.props.name}</Link>
               </div>
            </div>
            <div className="right menu primary">
               <button className="item ui large button" onClick={this.onClick} href="/">
                  Cerrar sesión
                  <i className="sign-out icon" style={{ marginLeft: '8px' }}></i>
               </button>
            </div>
         </div>
      );
   }
}

export default Menu;
