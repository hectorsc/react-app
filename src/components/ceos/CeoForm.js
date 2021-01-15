import React from 'react';
import history from '../../history';

class CeoForm extends React.Component {

   constructor(props) {
      super(props);
      this.initialStateValues = {
         fields: {
            name: '',
            company_name: '',
            company_headquarters: '',
            year: '',
            what_company_does: ''
         },
         errors : ''
      };
      this.state = this.initialStateValues; 
   }

   //necesario para el editar
   componentDidUpdate(prevProps) {
      if (prevProps.initialValues !== this.props.initialValues) {
         this.setState({fields: {...this.props.initialValues}});
      }
   }
   
   onInputChange = event => {
      const { name, value } = event.target;
      this.setState(state => ({
         fields: {...state.fields, [name]: value},
         errors: {
            ...state.errors, 
            [name]: ''
         }
      }));
   };

   onFormSubmit = async event => {
      event.preventDefault();
      const response = await this.props.onSubmit(this.state.fields);
      if (response.errors) {
         this.setState({ errors: response.errors})
         return
      }
      history.push('/');
   }

   render() {
      const {errors, fields} = this.state;
      console.log('errores', errors.name)
      return (
         <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="two fields">
               <div className={errors.name ? 'field error' : 'field'}>
                  <label>Nombre CEO</label>
                  <input 
                     type="text" name="name" placeholder="Nombre CEO" 
                     value={fields.name} 
                     onChange={this.onInputChange}
                  />
                  {
                     errors.name && 
                        <div className="ui pointing basic label prompt">
                           {errors.name}
                        </div>
                  }
               </div>
               <div className={errors.company_name ? 'field error' : 'field'}>
                  <label>Nombre empresa</label>
                  <input 
                     type="text" name="company_name" placeholder="Nombre empresa" 
                     value={fields.company_name} 
                     onChange={this.onInputChange}
                  />
                  {
                     errors.company_name && 
                        <div className="ui pointing prompt basic label">
                           {errors.company_name}
                        </div>
                  }
               </div>
            </div>

            <div className="two fields">
               <div className={errors.company_headquarters ? 'field error' : 'field'}>
                  <label>Sede</label>
                  <input 
                     type="text" name="company_headquarters" placeholder="Sede" 
                     value={fields.company_headquarters} 
                     onChange={this.onInputChange} 
                  />
                  {
                     errors.company_headquarters && 
                        <div className="ui pointing prompt basic label">
                           {errors.company_headquarters}
                        </div>
                  }
               </div>
               <div className={errors.year ? 'field error' : 'field'}>
                  <label>Año creación</label>
                  <input 
                     type="text" pattern="[0-9]*" name="year" placeholder="Año creación"
                     value={fields.year} 
                     onChange={this.onInputChange}  
                  />
                  {
                     errors.year && 
                        <div className="ui pointing prompt basic label">
                           {errors.year}
                        </div>
                  }
               </div>
            </div>
               
            <div className={errors.what_company_does ? 'field error' : 'field'}>
               <label>¿A qué se dedica la empresa?</label>
               <textarea
                  type="text" name="what_company_does" placeholder="¿A qué se dedica la empresa?" 
                  value={fields.what_company_does} 
                  onChange={this.onInputChange}
               />
               {
                  errors.what_company_does && 
                     <div className="ui pointing prompt basic label">
                        {errors.what_company_does}
                     </div>
               }
            </div>
            <button className="ui button primary" type="submit">{this.props.initialValues ? 'Editar' : 'Crear' }</button>
         </form>
      );
   }
};

export default CeoForm;