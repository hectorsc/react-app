import React from "react";
import "../../login.css";
import { register } from "../../api/laravelapi";
import history from "../../history";

class Login extends React.Component {
   
   constructor(props) {
      super(props);
      this.initialStateValues = {
         fields: { name: '', email: '', password: '', password_confirmation: '' },
         errors: '',
      };
      this.state = this.initialStateValues;
   }

   onInputChange = (event) => {
      const { name, value } = event.target;
      this.setState((state) => ({
         fields: { ...state.fields, [name]: value },
         errors: {
            ...state.errors,
            [name]: "",
         },
      }));
   };

   onFormSubmit = async (e) => {
      e.preventDefault();
      const response = await register(this.state.fields);
      if (response.errors) {
         this.setState({ errors: response.errors });
         return;
      }
      localStorage.setItem("token", response.access_token);
      window.location = window.location.origin;
   };

   render() {
      const { errors, fields } = this.state;
      return (
         <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked secondary segment">
               <div className={errors.name ? "field error" : "field"}>
                  <div className="ui left icon input">
                     <i className="user icon"></i>
                     <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={fields.name}
                        onChange={this.onInputChange}
                     />
                  </div>
                  {errors.name && (
                     <div className="ui pointing red basic label auth prompt">
                        {errors.name}
                     </div>
                  )}
               </div>
               <div className={errors.email ? "field error" : "field"}>
                  <div className="ui left icon input">
                     <i className="envelope icon"></i>
                     <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={fields.email}
                        onChange={this.onInputChange}
                     />
                  </div>
                  {errors.email && (
                     <div className="ui pointing red basic label auth prompt">
                        {errors.email}
                     </div>
                  )}
               </div>
               <div className={errors.password ? "field error" : "field"}>
                  <div className="ui left icon input">
                     <i className="lock icon"></i>
                     <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={fields.password}
                        onChange={this.onInputChange}
                     />
                  </div>
                  {errors.password && (
                     <div className="ui pointing red basic label auth prompt">
                        {errors.password}
                     </div>
                  )}
               </div>
               <div className="field">
                  <div className="ui left icon input">
                     <i className="lock icon"></i>
                     <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirmar contraseña"
                        value={fields.password_confirmation}
                        onChange={this.onInputChange}
                     />
                  </div>
               </div>
               <button className="ui fluid large teal submit button" type="submit">
                  Crear cuenta
               </button>
            </div>
         </form>
      );
   }
}

export default Login;
