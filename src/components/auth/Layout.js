import React from "react";
import "../../login.css";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';

class Layout extends React.Component {

   render() {
      const { pathname } = this.props.location;
      return (
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">
                {pathname === "/register" ? "Crea tu cuenta" : "Inicie sesión con su cuenta"}
              </div>
            </h2>
            {pathname === '/register' ? <RegisterForm /> : <LoginForm />}
            <div className="ui message">
               {pathname === "/" && (
                  <React.Fragment>
                     ¿Eres nuevo? <Link to="/register">Crea una cuenta</Link>
                  </React.Fragment>
               )}
               {pathname === "/register" && (
                  <React.Fragment>
                     Regresa a <Link to="/">Inicio de sesión</Link>
                  </React.Fragment>
               )}
            </div>
          </div>
        </div>
      );
   }
}

export default Layout;
