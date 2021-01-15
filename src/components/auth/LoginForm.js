import React from "react";
import "../../login.css";
import { login } from "../../api/laravelapi";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.initialStateValues = {
         fields: { email: '', password: '' },
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
            [name]: '',
         },
      }));
   };

   onFormSubmit = async (e) => {
      e.preventDefault();
      const response = await login(this.state.fields);
      if (response.errors) {
         this.setState({ errors: response.errors });
         return;
      }
      localStorage.setItem("token", response.access_token);
      window.location.reload();
   };

   render() {
      const { errors, fields } = this.state;
      console.log(errors.email)
      return (
         <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked secondary  segment">
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
               <button className="ui fluid large teal submit button" type="submit">
                  Entrar
               </button>
            </div>
         </form>
      );
   }
}

export default Login;
